import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FC, useMemo, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchTimeZones } from "../../api/fetchRequests";
import { useDebouncedSearch } from "../../hooks.ts/useDebouncedSearch";
import { Modal } from "../Modal";
import {
    Container,
    Content,
    ContentHalfContainer,
    ContentHalfTitle,
    Footer,
    Header,
    ListContainer,
    ListElement,
    ListElementText,
} from "./TimezonesSelector.styled";

interface TimezonesSelectorProps {
    onApply: (timeZones: string[]) => void;
    savedTimeZones: string[];
}

export const TimezonesSelector = NiceModal.create<TimezonesSelectorProps>(
    ({ onApply, savedTimeZones }) => {
        const modal = useModal();
        const { isLoading, data } = useQuery<string[]>("timezones", fetchTimeZones);

        const [addedTimeZones, setAddedTimeZones] =
            useState<string[]>(savedTimeZones);
        const addedTimeZonesSet = new Set(addedTimeZones);

        const addTimeZone = (timeZone: string) => {
            setAddedTimeZones((prev) => [...prev, timeZone]);
        };
        const removeTimeZone = (timeZone: string) => {
            setAddedTimeZones((prev) => prev.filter((el) => el !== timeZone));
        };

        return (
            <Modal>
                <Container>
                    <Header>
                        <button onClick={() => modal.remove()}>
                            <IoMdClose size={24} />
                        </button>
                    </Header>
                    <Content>
                        <ContentHalf
                            title="Available"
                            loading={isLoading}
                            data={data || []}
                            dataToExclude={addedTimeZonesSet}
                            side="left"
                            onTimeZoneClick={(timeZone) => addTimeZone(timeZone)}
                        />
                        <ContentHalf
                            title="Added"
                            data={addedTimeZones}
                            side="right"
                            onTimeZoneClick={(timeZone) => removeTimeZone(timeZone)}
                        />
                    </Content>
                    <Footer>
                        <button
                            onClick={() => {
                                onApply(addedTimeZones);
                                modal.remove();
                            }}
                        >
                            Apply
                        </button>
                    </Footer>
                </Container>
            </Modal>
        );
    }
);

interface ContentHalfProps {
    title: string;
    loading?: boolean;
    data: string[];
    dataToExclude?: Set<string>;
    side: "left" | "right";
    onTimeZoneClick: (timeZone: string) => void;
}

const ContentHalf: FC<ContentHalfProps> = ({
    loading,
    title,
    data,
    dataToExclude,
    side,
    onTimeZoneClick,
}) => {
    const { searchValue, onChange, debouncedSearchValue } = useDebouncedSearch();

    const searchedData = useMemo(
        () =>
            data.filter((el) =>
                el.toLowerCase().includes(debouncedSearchValue.toLowerCase())
            ),
        [debouncedSearchValue, data]
    );

    return (
        <ContentHalfContainer drawRightBorder={side === "left"}>
            <ContentHalfTitle>{title}</ContentHalfTitle>
            <input value={searchValue} onChange={onChange} />
            {loading && <p>Loading...</p>}
            <ListContainer>
                {searchedData.map((timeZone) =>
                    dataToExclude?.has(timeZone) ? null : (
                        <ListElement
                            key={timeZone}
                            onClick={() => onTimeZoneClick(timeZone)}
                        >
                            {side === "right" && <HiOutlineChevronLeft size={24} />}
                            <ListElementText title={timeZone}>
                                {timeZone}
                            </ListElementText>
                            {side === "left" && <HiOutlineChevronRight size={24} />}
                        </ListElement>
                    )
                )}
            </ListContainer>
        </ContentHalfContainer>
    );
};
