import { Button, Divider, Grid, Modal, Select, TextInput } from "@mantine/core";
import {
    Icon123,
    IconAt,
    IconBrandTelegram,
    IconPhonePlus,
} from "@tabler/icons";
import React from "react";
import { useUiStore } from "../../../../hooks/useUiStore";

export const ModalCreateCoord = () => {
    const { isOpenModalCreateCoord, modalActionCoord } = useUiStore();

    return (
        <Modal
            opened={isOpenModalCreateCoord}
            onClose={() => modalActionCoord("close")}
            title="Crear Coordinador"
        >
            <Grid grow>
                <Grid.Col span={6}>
                    <TextInput
                        placeholder="Nombres"
                        label="Nombres"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        placeholder="Apellidos"
                        label="Apellidos"
                        withAsterisk
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
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        placeholder="Teléfono"
                        label="Teléfono"
                        icon={<IconPhonePlus size={14} />}
                        mt={16}
                        withAsterisk
                    />
                </Grid.Col>
            </Grid>
            <TextInput
                placeholder="Email"
                label="Email"
                mt={16}
                icon={<IconAt size={14} />}
                withAsterisk
            />
            <Select
                label="Cantón"
                placeholder="Cantón"
                mt={16}
                withAsterisk
                data={[
                    { value: "react", label: "React" },
                    { value: "ng", label: "Angular" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                ]}
            />
            <Select
                label="Parroquia"
                placeholder="Parroquia"
                mt={16}
                withAsterisk
                data={[
                    { value: "react", label: "React" },
                    { value: "ng", label: "Angular" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                ]}
            />
            <Select
                label="Recinto"
                placeholder="Recinto"
                mt={16}
                withAsterisk
                data={[
                    { value: "react", label: "React" },
                    { value: "ng", label: "Angular" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                ]}
            />
            <Divider my="sm" variant="dashed" />
            <Button fullWidth leftIcon={<IconBrandTelegram />} color="yellow">
                Crear
            </Button>
        </Modal>
    );
};
