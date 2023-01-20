import { Button, Card, Group, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateCoord } from "./ui/ModalCreateCoord";
import { GridTableCoord } from "./ui/GridTableCoord";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ModalCreateCoordxAdmin } from "./ui/ModalCreateCoordxAdmin";

export const TableCoordsPage = () => {
    const { user } = useAuthStore();
    const { modalActionCoord, modalActionCoordxAdmin } = useUiStore();

    const handleCreateCoord = async (e) => {
        e.preventDefault();

        if (user.roles?.includes("Administrador")) {
            modalActionCoordxAdmin("open"); //cuando lo crea un Admin
        } else {
            modalActionCoord("open"); //Cuando lo crea un Supervidor
        }
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
                    sx={{ position: "static", width: 1200 }}
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
            <ModalCreateCoordxAdmin />

        </>
    );
};
