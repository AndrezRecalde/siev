import { Button, Divider, Grid, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    Icon123,
    IconAt,
    IconBrandTelegram,
    IconPhonePlus,
} from "@tabler/icons";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../../hooks/useConsejoStore";
import { useStatesStore } from "../../../../hooks/useStatesStore";
import { useUiStore } from "../../../../hooks/useUiStore";

export const ModalCreateVeed = () => {
    const { isOpenModalCreateVeedor, modalActionVeedor } = useUiStore();
    const { activateVeedor, setClearActivateVeedor, startSavingVeedor } =
        useConsejoStore();

    const {
        allParroquias,
        recintos,
        allRecintos,
        startLoadRecintos,
        startClearStates,
    } = useStatesStore();

    const { startProfile } = useAuthStore();

    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            dni: "",
            phone: "",
            email: "",
            observacion: "",
            parroquia_id: 0,
            recinto_id: 0,
            recinto__id: 0,
        },
        validate: {
            first_name: (value) =>
                value.length < 3 ? "El nombre es requerido" : null,
            last_name: (value) =>
                value.length < 3 ? "El apellido es requerido" : null,
            dni: (value) =>
                value.length < 9
                    ? "Ingrese la cédula correctamente (deben ser 10 dígitos)"
                    : value.length > 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : null,
            phone: (value) =>
                value.length < 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : value.length > 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : null,
            parroquia_id: (value) =>
                value === 0 ? "Ingrese la parroquia" : null,
            recinto_id: (value) =>
                value === 0 ? "Ingrese el recinto donde vota" : null,
            recinto__id: (value) =>
                value === 0 ? "Ingrese el recinto donde cuida voto" : null,
        },
    });

    const { parroquia_id } = form.values;

    useEffect(() => {
        form.setFieldValue("recinto_id", 0);
        startLoadRecintos({ parroquia_id });
    }, [parroquia_id]);

    useEffect(() => {
        if (activateVeedor !== null) {
            form.setValues({
                ...activateVeedor,
            });
            return;
        }

        form.reset();
    }, [activateVeedor]);

    const handleCreateVeed = async (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("first_name") &&
            !errors.hasOwnProperty("last_name") &&
            !errors.hasOwnProperty("dni") &&
            !errors.hasOwnProperty("phone") &&
            !errors.hasOwnProperty("email") &&
            !errors.hasOwnProperty("parroquia_id") &&
            !errors.hasOwnProperty("recinto_id") &&
            !errors.hasOwnProperty("recinto__id")
        ) {
            await startSavingVeedor(form.values);
            modalActionVeedor("close");
            await startProfile();
            form.reset();
        } else {
            console.log("Error");
        }
    };

    const handleCloseModal = () => {
        modalActionVeedor("close");
        startClearStates();
        setClearActivateVeedor();
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalCreateVeedor}
            onClose={handleCloseModal}
            title="Crear Veedor"
        >
            <form onSubmit={handleCreateVeed}>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Nombres"
                            label="Nombres"
                            withAsterisk
                            {...form.getInputProps("first_name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Apellidos"
                            label="Apellidos"
                            withAsterisk
                            {...form.getInputProps("last_name")}
                        />
                    </Grid.Col>
                </Grid>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Cédula"
                            label="Cédula"
                            icon={<Icon123 size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("dni")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            icon={<IconPhonePlus size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("phone")}
                        />
                    </Grid.Col>
                </Grid>

                <TextInput
                    placeholder="Email (Opcional)"
                    label="Email"
                    mt={16}
                    icon={<IconAt size={14} />}
                    {...form.getInputProps("email")}
                />

                <Textarea
                    placeholder="Ingrese observación o detalles especificos del veedor"
                    label="Detalles Especificos"
                    mt={16}
                    {...form.getInputProps("observacion")}
                />

                <Select
                    label="Parroquia de votación del Veedor"
                    placeholder="Parroquia de votación del veedor"
                    searchable
                    withAsterisk
                    mt={16}
                    {...form.getInputProps("parroquia_id")}
                    data={allParroquias.map((parroquia) => {
                        return {
                            value: parroquia.id,
                            label: parroquia.nombre_parroquia,
                        };
                    })}
                />
                <Select
                    label="Recinto donde vota"
                    placeholder="Recinto donde vota"
                    searchable
                    withAsterisk
                    mt={16}
                    {...form.getInputProps("recinto_id")}
                    data={recintos.map((recinto) => {
                        return {
                            value: recinto.id,
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Select
                    label="Recinto donde cuidará el voto"
                    placeholder="Recinto donde cuidará el voto"
                    searchable
                    withAsterisk
                    mt={16}
                    {...form.getInputProps("recinto__id")}
                    data={allRecintos.map((recinto) => {
                        return {
                            value: recinto.id,
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Divider my="sm" variant="dashed" />
                <Button
                    onClick={handleCreateVeed}
                    fullWidth
                    leftIcon={<IconBrandTelegram />}
                    color="yellow"
                >
                    Crear
                </Button>
            </form>
        </Modal>
    );
};
