//STYLES
import styles from "../styles/settingsComponents/Settings.module.scss"

//COMPONENTS
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";

//UTILS
import { useUserUpdatePassword } from "../queries/user";
import { useState } from "react";
import { queryClient } from "../constants/config";

const Settings = () => {
    const { mutate: UpdatePassword, isError, error, isLoading } = useUserUpdatePassword();
    const [oldPw, setOldPw] = useState("");
    const [newPw, setNewPw] = useState("");

    let body = {
        oldPassword: oldPw,
        password: newPw,
    };

    return <MainContainer>
        <Title>Configurações</Title>
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
            <div className={styles.container}>
                {/* OLD PW */}
                <div className={styles.password}>
                    <label htmlFor="oldPassword">Senha Atual: </label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={oldPw}
                        autoComplete="current-password"
                        onChange={(e) => setOldPw(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.container}>
                {/* NEW PW */}
                <div className={styles.password}>
                    <label htmlFor="newPassword">Nova Senha: </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPw}
                        autoComplete="new-password"
                        onChange={(e) => setNewPw(e.target.value)}
                    />
                </div>
                <button
                    onClick={() =>
                        UpdatePassword(body, {
                            onSuccess: () => {
                                queryClient.invalidateQueries("user");
                                queryClient.removeQueries();
                            },
                        })
                    }
                >
                    {isLoading ? "Carregando" : "Salvar"}
                </button>
            </div>
            {isError && (
                <div style={{ marginTop: "1rem", color: "red" }}>
                    {error.response.data}
                </div>
            )}
        </form>
    </MainContainer>;
};

export default Settings;