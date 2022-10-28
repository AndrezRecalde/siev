import { Button, Card, Group, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateCoord } from "./ui/ModalCreateCoord";
import { GridTableCoord } from "./ui/GridTableCoord";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { useConsejoStore } from "../../../hooks/useConsejoStore";

export const TableCoordsPage = () => {
    const { modalActionCoord } = useUiStore();
    const { startLoadCantones, startLoadRoles } = useStatesStore();
    const { setClearActivateUser } = useConsejoStore();

    const handleCreateCoord = async (e) => {
        e.preventDefault();
        startLoadCantones();
        startLoadRoles();
        setClearActivateUser();
        modalActionCoord("open");
    };

    return (
        <>
            <Group position="center">
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                    mt="lg"
                    mb="lg"
                    sx={{ position: "static", width: 800 }}
                >
                    <Card.Section withBorder inheritPadding py="lg">
                        <Group position="apart">
                            <Text
                                component="span"
                                weight={600}
                                style={{
                                    fontFamily: "Greycliff CF, sans-serif",
                                    fontSize: 20,
                                }}
                            >
                                Coordinadores
                            </Text>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Button
                            onClick={handleCreateCoord}
                            leftIcon={<IconPencilPlus />}
                            variant="white"
                        >
                            Crear Coordinador
                        </Button>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <GridTableCoord />
                    </Card.Section>
                </Card>
            </Group>
            <ModalCreateCoord />
        </>
    );
};
