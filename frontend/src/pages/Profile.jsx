import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useUser, useUserUpdate } from "../queries/user";
import { useState, useEffect } from "react";
import styles from "../styles/profileComponents/Profile.module.scss";

const Profile = () => {
    const {data: user, isSuccess } = useUser();
    const {
        mutate: UserUpdate,
        isSuccess: userUpdate,
        isError: userNotUpdate,
    } = useUserUpdate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");

    useEffect(() => {
        if(isSuccess){
            try{
                setFirstName(user.data.firstName);
                setLasName(user.data.lastName);
            }
            catch{

            }
        }
    }, [isSuccess, user]);

    const body = {
        firstName: firstName,
        lastName: lastName,
    };

    return (
        <MainContainer>
            <Title>Perfil</Title>
            <form action="submit" onSubmit={(e) => e.preventDefault()}>
                <div className={styles.container}>
                    {/*FIRST NAME*/}
                    <div className={styles.firstName}>
                        <label htmlFor="firstName">Nome: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    {/*LAST NAME*/}
                    <div className={styles.lastName}>
                        <label htmlFor="lastName">Sobrenome: </label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLasName(e.target.value)}
                        />
                    </div>
                    {/*BUTTON*/}
                    <button onClick={() => UserUpdate(body)}>Atualizar</button>
                    {userUpdate && (
                        <div style={{ marginTop: "1rem", color: "green"}}>Sucesso</div>
                    )}
                    {userNotUpdate && (
                        <div style={{ marginTop: "1rem", color: "red"}}>Erro</div>
                    )}
                </div>
            </form>
        </MainContainer>
    )
};

export default Profile;