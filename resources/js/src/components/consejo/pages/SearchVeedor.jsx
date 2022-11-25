import {
    Button,
    Card,
    Container,
    Grid,
    Group,
    Paper,
    Select,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconFileText } from "@tabler/icons";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useSearch } from "../../../hooks/useSearch";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { GridTableVeedSearch } from "./ui/GridTableSearch";

export const SearchVeedor = () => {
    const { user, supervisores } = useAuthStore();

    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
    } = useStatesStore();

    const { startSearch, startExportFilter } = useSearch();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
            recinto__id: 0,
            user_id: 0,
        },
    });

    useEffect(() => {
        startLoadCantones();
    }, []);

    const { canton_id, parroquia_id } = form.values;

    useEffect(() => {
        form.setFieldValue("parroquia_id", 0);
        startLoadParroquias({ canton_id });
    }, [canton_id]);

    useEffect(() => {
        form.setFieldValue("recinto__id", 0);
        startLoadRecintos({ parroquia_id });
    }, [parroquia_id]);

    const handleSearch = (e) => {
        e.preventDefault();
        startSearch(form.values);
        /* console.log(form.values) */
    };

    const handleExport = (e) => {
        e.preventDefault();
        startExportFilter(form.values);
    };

    return (
        <Container>
            <Card
                withBorder
                shadow="sm"
                radius="md"
                mt="lg"
                mb="lg"
                sx={{ position: "static", width: "auto" }}
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
                            Buscar Veedores
                        </Text>
                        <Button
                            color="red"
                            variant="light"
                            radius="md"
                            uppercase
                            onClick={handleExport}
                            leftIcon={<IconFileText size={14} />}
                        >
                            Exportar - PDF
                        </Button>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <form onSubmit={handleSearch}>
                        <Grid>
                            <Grid.Col xs={6} md={6} lg={3}>
                                <Select
                                    label="Selecciona el Cantón"
                                    placeholder="Cantón"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    {...form.getInputProps("canton_id")}
                                    data={cantones.map((canton) => {
                                        return {
                                            value: canton.id,
                                            label: canton.nombre_canton,
                                        };
                                    })}
                                />
                            </Grid.Col>
                            <Grid.Col xs={6} md={6} lg={3}>
                                <Select
                                    label="Selecciona el Parroquia"
                                    placeholder="Parroquia"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    {...form.getInputProps("parroquia_id")}
                                    data={parroquias.map((parroquia) => {
                                        return {
                                            value: parroquia.id,
                                            label: parroquia.nombre_parroquia,
                                        };
                                    })}
                                />
                            </Grid.Col>
                            <Grid.Col xs={6} md={6} lg={3}>
                                <Select
                                    label="Selecciona el Recinto"
                                    placeholder="Recinto"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    {...form.getInputProps("recinto__id")}
                                    data={recintos.map((recinto) => {
                                        return {
                                            value: recinto.id,
                                            label: recinto.nombre_recinto,
                                        };
                                    })}
                                />
                            </Grid.Col>

                            {user.roles.includes("Administrador") ? (
                                <Grid.Col xs={6} md={6} lg={3}>
                                    <Select
                                        label="Selecciona el Responsable"
                                        placeholder="Responsable"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("user_id")}
                                        data={supervisores.map((supervisor) => {
                                            return {
                                                value: supervisor.id,
                                                label:
                                                    supervisor.first_name +
                                                    supervisor.last_name,
                                            };
                                        })}
                                    />
                                </Grid.Col>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Card.Section inheritPadding py="lg">
                            <Button
                                color="yellow"
                                variant="light"
                                radius="md"
                                uppercase
                                fullWidth
                                onClick={handleSearch}
                                leftIcon={<IconDatabase size={14} />}
                            >
                                Filtrar
                            </Button>
                        </Card.Section>
                    </form>
                </Card.Section>
            </Card>

            {/* <SimpleGrid cols={2}>
                {results?.map((resu) => (
                    <VeedoresPage key={resu.id} {...resu} />
                ))}
            </SimpleGrid> */}
            <Paper mb={30}>
                <GridTableVeedSearch />
            </Paper>
        </Container>
    );
};
