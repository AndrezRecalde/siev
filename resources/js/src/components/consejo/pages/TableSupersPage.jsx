import { Button, Card, Group, Table, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateSuper } from "./ui/ModalCreateSuper";

export const TableSupersPage = () => {

    const { supervisores } = useAuthStore();

    const { modalActionSuper } = useUiStore();

    const handleCreateSuper = (e) => {
        e.preventDefault();
        modalActionSuper("open");
    };

    const rows = supervisores.map((element) => (
        <tr key={element.dni}>
            <td>{element.first_name + ' ' + element.last_name}</td>
            <td>{element.phone}</td>
            <td>{element.canton.nombre_canton}</td>
            <td>{element.parroquias.map(parr => parr.nombre_parroquia)}</td>

        </tr>
    ));

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
                                Supervisores
                            </Text>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Button
                            onClick={handleCreateSuper}
                            leftIcon={<IconPencilPlus />}
                            variant="white"
                        >
                            Crear Supervisor
                        </Button>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Telefono</th>
                                    <th>Canton</th>
                                    <th>Parroquia</th>
                                    <th>Acciones</th>


                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Group>
            <ModalCreateSuper />
        </>
    );
};
