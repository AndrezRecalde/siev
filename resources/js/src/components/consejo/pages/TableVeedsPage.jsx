import { Button, Card, Group, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { GridTableVeed } from "./ui/GridTableVeed";
import { ModalCreateVeed } from "./ui/ModalCreateVeed";


export const TableVeedsPage = () => {

    const { juntas, veedores } = useAuthStore();
    const { modalActionVeedor } = useUiStore();
    const { startLoadAllParroquias, startLoadAllRecintos, startLoadRoles } = useStatesStore();

    const handleCreateVeedor = (e) => {
        e.preventDefault();
        modalActionVeedor("open")
        startLoadAllParroquias();
        startLoadAllRecintos();
        startLoadRoles();
    }

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
                            Veedores
                        </Text>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <Button disabled={juntas === veedores?.length ? true : false} onClick={(e) => handleCreateVeedor(e)} leftIcon={<IconPencilPlus />} variant="white">
                        Crear Veedor
                    </Button>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <GridTableVeed />
                </Card.Section>
            </Card>
        </Group>
        <ModalCreateVeed />
        </>
    );
};
