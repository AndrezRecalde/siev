import {
    Button,
    Card,
    Container,
    Group,
    PasswordInput,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../../hooks/useAuthStore";

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const form = useForm({
        initialValues: {
            dni: "",
            password: "",
        },
        validate: {
            dni: (value) =>
                value.length < 8
                    ? "Tu Cédula debe tener al menos 10 digitos"
                    : null,
            password: (value) =>
                value.length < 2 ? "Por favor introduce tu contraseña" : null,
        },
    });

    const handleLogin = async(e) => {
        e.preventDefault();
        const { errors } = form.validate();

        if(!errors.hasOwnProperty('dni') || !errors.hasOwnProperty('password')){
            await startLogin(form.values);

        }
    };

    useEffect(() => {
        if( errorMessage !== undefined){
          Swal.fire('Error', errorMessage, 'error')
        }
      }, [errorMessage]);

    return (
        <Container>
            <form onSubmit={handleLogin}>
                <Group position="center" mt={100}>
                    <Card
                        withBorder
                        shadow="sm"
                        radius="md"
                        mt="lg"
                        mb="lg"
                        sx={{ position: "static", width: 400 }}
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
                                    Sistema de Veedores
                                </Text>
                            </Group>
                        </Card.Section>
                        <Card.Section withBorder inheritPadding py="lg">
                            <Text
                                component="span"
                                size="xl"
                                weight={600}
                                style={{
                                    fontFamily: "Greycliff CF, sans-serif",
                                    fontSize: 30,
                                }}
                            >
                                Acceder
                            </Text>
                            <TextInput
                                label="Cedula"
                                placeholder="Ingrese su numero de cedula"
                                mt="lg"
                                variant="filled"
                                size="md"
                                autoComplete="nope"
                                withAsterisk
                                icon={<IconInfoCircle size={14} />}
                                {...form.getInputProps("dni")}
                            />
                            <PasswordInput
                                label="Contraseña"
                                placeholder="Ingrese su contraseña"
                                mt="lg"
                                variant="filled"
                                size="md"
                                autoComplete="nope"
                                withAsterisk
                                {...form.getInputProps("password")}
                            />
                        </Card.Section>
                        <Card.Section withBorder inheritPadding py="lg">
                            <Button
                                color="yellow"
                                size="md"
                                radius="md"
                                fullWidth
                                uppercase
                                type="submit"
                            >
                                Acceder
                            </Button>
                        </Card.Section>
                    </Card>
                </Group>
            </form>
        </Container>
    );
};
