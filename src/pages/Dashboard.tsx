import { Image, Container, Text, Button, Grid, Title, Card, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function DashboardPage() {
    const navigate = useNavigate();

    // Assuming you have an array of passwords with a "name" property
    const passwords = [
        { id: '1', name: 'Apple', password: '123456', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2022-01-01') },
        { id: '2', name: 'Banana', password: 'abcdef', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2021-01-02') },
        { id: '3', name: 'Carrot', password: 'qwerty', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2022-01-03') },
        { id: '4', name: 'Avocado', password: '987654', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2023-01-04') },
        { id: '5', name: 'Broccoli', password: 'zxcvbn', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2024-01-05') },
        { id: '6', name: 'Cabbage', password: 'poiuyt', icon: 'https://cdn-icons-png.flaticon.com/512/440/440664.png', date: new Date('2022-01-06') },
    ];

    const [sortBy, setSortBy] = useState('A-Z');
    const [selectedPassword, setSelectedPassword] = useState<string | null>(null);
    const [groupedPasswords, setGroupedPasswords] = useState<Map<string, { name: string; password: string, id: string, icon: string, date: Date }[]>>(new Map());

    const groupPasswordsByFirstLetter = () => {
        const groupedPasswords: Map<string, { name: string; password: string, id: string, icon: string, date: Date }[]> = new Map();

        passwords.forEach(password => {
            const firstLetter = password.name[0].toUpperCase();
            if (!groupedPasswords.has(firstLetter)) {
                groupedPasswords.set(firstLetter, []);
            }
            groupedPasswords.get(firstLetter)?.push(password);
        });

        return groupedPasswords;
    };

    const groupPasswordsByNewest = () => {
        const groupedPasswords: { [key: string]: { name: string; password: string, id: string, icon: string, date: Date }[] } = {};

        passwords.forEach(password => {
            const year = password.date.getFullYear().toString();
            if (!groupedPasswords[year]) {
                groupedPasswords[year] = [];
            }
            groupedPasswords[year].push(password);
        });

        return groupedPasswords;
    };


    const groupPasswordsByOldest = () => {
        const groupedPasswords: { [key: string]: { name: string; password: string, id: string, icon: string, date: Date }[] } = {};

        passwords.forEach(password => {
            const year = password.date.getFullYear().toString();
            if (!groupedPasswords[year]) {
                groupedPasswords[year] = [];
            }
            groupedPasswords[year].push(password);
        });

        return groupedPasswords;
    };


    useEffect(() => {
        if (!localStorage.getItem('SecurVaultToken')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "SecurVault | Dashboard";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('SecurVaultToken');
        navigate('/login');
    };

    const handleSelectPassword = (passwordId: string) => {
        setSelectedPassword(passwordId);
    };

    useEffect(() => {
        const deselectPassword = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('[data-password-id]')) {
                setSelectedPassword(null);
            }
        };

        document.addEventListener('click', deselectPassword);

        return () => {
            document.removeEventListener('click', deselectPassword);
        };
    }, []);

    useEffect(() => {
        //MAP 
        let sortedGroupedPasswords: Map<string, { name: string; password: string, id: string, icon: string, date: Date }[]> = new Map();
        if (sortBy === 'A-Z') {
            sortedGroupedPasswords = groupPasswordsByFirstLetter();
        } else if (sortBy === 'Newest') {
            const groupedPasswords = groupPasswordsByNewest();

            const sortedKeys = Object.keys(groupedPasswords).sort((a, b) => parseInt(b) - parseInt(a));


            sortedKeys.forEach((key: string) => {
                sortedGroupedPasswords.set(key, groupedPasswords[key]);
            });
        } else if (sortBy === 'Oldest') {
            const groupedPasswords = groupPasswordsByOldest();

            const sortedKeys = Object.keys(groupedPasswords).sort((a, b) => parseInt(a) - parseInt(b));


            sortedKeys.forEach((key: string) => {
                sortedGroupedPasswords.set(key, groupedPasswords[key]);
            });
        }

        if (!sortedGroupedPasswords) return;

        setGroupedPasswords(sortedGroupedPasswords);

    }, [sortBy]);

    return (
        <Container size="lg" style={{ textAlign: 'center' }} fluid>
            <Title order={1} component="h1" m={50} c="white" style={{
                textAlign: 'center', textShadow:
                    "-1px -1px 0 black, 0   -1px 0 black,1px -1px 0 black,1px  0   0 black,1px  1px 0 black, 0    1px 0 black,-1px  1px 0 black,-1px  0   0 black"
            }}>Welcome to your Password Manager Dashboard</Title>
            <Grid gutter="lg" mt={50}>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Card shadow="sm">
                        <Title order={3}>Options</Title>
                        <Button onClick={handleLogout} fullWidth color="red" mt={15}>Logout</Button>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Card shadow="sm">
                        <Title order={3}>Stored Passwords</Title>
                        <Text>View your stored passwords here</Text>

                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: '10px', marginBottom: '15px', lineHeight: '1.5' }}>Sort by</Text>
                                <Select
                                    radius="md"
                                    size="xs"
                                    data={['A-Z', 'Newest', 'Oldest']}
                                    mb={'15px'}
                                    value={sortBy}
                                    onChange={(value) => setSortBy(value?.toString() || 'A-Z')}
                                    styles={{
                                        input: {
                                            textAlign: 'center',
                                            lineHeight: '1.5',
                                        },
                                        dropdown: {
                                            textAlign: 'center',
                                        },
                                    }}
                                />
                            </div>

                            {Array.from(groupedPasswords).map(([letter, passwords]) => (
                                <div key={letter}>
                                    <Title order={4} style={{ border: '1px solid white', textAlign: 'start', paddingLeft: '15px' }}>{letter}</Title>
                                    {passwords.map(password => (
                                        <div key={password.id} data-password-id={password.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: selectedPassword === password.id ? '#0075F6' : '#1D1D1D', padding: '5px' }} onClick={() => handleSelectPassword(password.id)}>
                                            <Image src={password.icon} alt={password.name} width={64} height={64} ml={5} style={{ marginRight: '10px' }} />
                                            <Text style={{ color: 'white' }} ml={15}>{password.name}</Text>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
};