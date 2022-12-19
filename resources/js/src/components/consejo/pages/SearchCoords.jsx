import {
    Button,
    Card,
    Container,
    Grid,
    Group,
    Paper,
    Select,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconDatabaseExport } from "@tabler/icons";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useSearch } from "../../../hooks/useSearch";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { GridTableCoordsSearch } from "./ui/GridTableCoordsSearch";
import { GridTableVeedSearch } from "./ui/GridTableSearch";

export const SearchCoords = () => {
    const { user, supervisores } = useAuthStore();

    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
    } = useStatesStore();

    const { startSearchCoords, startExportFilterCoords, startExportExcelCoords } = useSearch();



    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
            recinto__id: 0,
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
        startSearchCoords(form.values);
        /* console.log(form.values) */
    };

    const handleExport = (e) => {
        e.preventDefault();
        startExportFilterCoords(form.values);
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        console.log(form.values);
        startExportExcelCoords(form.values);
    }

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
                            Buscar Coordinadores
                        </Text>
                        <Group>
                        <Button
                            variant="subtle"
                            color="red"
                            radius="lg"
                            onClick={handleExport}
                            leftIcon={<IconDatabaseExport size={15} color="red" />}
                        >
                            PDF
                        </Button>
                        <Button
                            variant="subtle"
                            color="green"
                            radius="lg"
                            onClick={handleExportExcel}
                            leftIcon={<IconDatabaseExport size={15} color="green" />}
                        >
                            Excel
                        </Button>
                        </Group>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <form onSubmit={handleSearch}>
                        <Grid grow>
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
            <Paper mb={30}>
                <GridTableCoordsSearch />
            </Paper>
        </Container>
    );
};
