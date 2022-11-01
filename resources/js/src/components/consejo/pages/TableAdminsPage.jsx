import { Button, Card, Group, Table, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../hooks/useConsejoStore";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateAdmin } from "./ui/ModalCreateAdmin";

export const TableAdminsPage = () => {

    const { modalActionAdmin } = useUiStore();
    const { administradores } = useAuthStore();


    const handleOpenModalAdmin = async(e) => {
        e.preventDefault();
        modalActionAdmin("open");
    };


    const rows = administradores.map((element) => (
        <tr key={element.dni}>
          <td>{element.first_name}</td>
          <td>{element.last_name}</td>

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
                                Administradores
                            </Text>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Button
                            onClick={handleOpenModalAdmin}
                            leftIcon={<IconPencilPlus />}
                            variant="white"
                        >
                            Crear Administrador
                        </Button>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Table withBorder striped>
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Group>
            <ModalCreateAdmin />
        </>
    );
};
