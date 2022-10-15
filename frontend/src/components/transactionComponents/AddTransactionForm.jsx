//STYLES
import styles from "../../styles/transactionComponents/AddTransactionForm.module.scss";

//COMPONENTS
import { Title } from "../Titles/Titles";

//UTILS
import { useEffect, useState } from "react";
import { useCategoriesGet } from "../../queries/category";
import { useTransactionPost } from "../../queries/transaction";
import { DateTime } from 'luxon';
import { queryClient } from "../../constants/config";

const AddTransactionForm = () => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [date, setDate] = useState(DateTime.now().toISODate());
    const [info, setInfo] = useState("");
    const [category, setCategory] = useState(10);

    const { data: ctgs } = useCategoriesGet();
    useEffect(() => {
        if(ctgs) setCategory(ctgs.data[0].id);
        else setCategory(1);
    }, [ctgs]);

    const { mutate: postTransaction, isLoading, isError, isSuccess, error, } = useTransactionPost();

    let body = {
        title: title,
        money: parseFloat(money),
        date: date,
        info: info,
        transactionCategoryId: parseInt(category),
    };

    return (
        <div className={styles.container}>
            <Title>Adicionar Transação</Title>
            <div className={styles.inner}>
                <input 
                    type="text"
                    placeholder="título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <input 
                    type="number"
                    placeholder="valor"
                    onChange={(e) => setMoney(e.target.value)}
                    value={money}
                />
                <input 
                    type="date"
                    placeholder="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
                <input 
                    type="text"
                    placeholder="info"
                    onChange={(e) => setInfo(e.target.value)}
                    value={info}
                />

                {/* CATEGORIES */}
                {ctgs ? (
                    <select onChange={(e) => setCategory(e.target.value)}>
                        {ctgs.data.map((ctg) => {
                            return (
                                <option key={ctg.id} value={ctg.id}>
                                    {ctg.name}
                                </option>
                            );
                        })}
                    </select>
                ) : (
                    <div>Carregando...</div>
                )}     

                {/* POST TRANSACTION */}
                <button 
                    onClick={() => {
                        postTransaction(body, {
                            onSuccess: async () => {
                                await queryClient.invalidateQueries("Categories_Sum");
                            },
                        });
                    }}
                >
                    {isLoading ? "Carregando..." : "Salvar"}
                </button>

                {/* ERROR */}
                <div style={{ marginBotton: "1rem" }}>
                    {isError &&
                        error.response.data.map((err, index) => {
                            return (
                                <div style={{ color: "red"}} key={index}>
                                    {`${err.instancePath} : ${err.message ? err.message : ""}`}
                                </div>
                            )
                        })}
                    {isSuccess && <div style={{ color: "green"}}>Sucesso</div>}
                </div>
            </div>
        </div>
    )
};

export default AddTransactionForm;