import {
    createStyles,
    Container,
    Group,
    ActionIcon,
    Image,
    Text,
} from "@mantine/core";
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from "@tabler/icons";
import logo from "../../../../assets/logos/logo.png";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        backgroundColor: theme.white,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[4]
        }`,
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Image width={50} height={50} fit="contain" src={logo} />

                <Group
                    spacing={0}
                    className={classes.links}
                    position="center"
                    noWrap
                >
                    <Text
                        component="span"
                        align="center"
                        variant="gradient"
                        gradient={{ from: "red", to: "yellow", deg: 45 }}
                        size="xl"
                        weight={700}
                        style={{ fontFamily: "Greycliff CF, sans-serif" }}
                    >
                        Partido Social Cristiano - Esmeraldas
                    </Text>
                </Group>

                <Group
                    spacing={0}
                    className={classes.links}
                    position="right"
                    noWrap
                >
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}
