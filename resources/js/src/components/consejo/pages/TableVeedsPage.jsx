import { Button, Card, Group, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateVeed } from "./ui/ModalCreateVeed";

export const TableVeedsPage = () => {

    const { modalActionVeedor } = useUiStore();

    const handleCreateVeedor = (e) => {
        e.preventDefault();
        modalActionVeedor("open")
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
                    <Button onClick={handleCreateVeedor} leftIcon={<IconPencilPlus />} variant="white">
                        Crear Veedor
                    </Button>
                </Card.Section>
            </Card>
        </Group>
        <ModalCreateVeed />
        </>
    );
};
