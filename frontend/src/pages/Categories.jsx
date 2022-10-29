import styles from "../styles/CategoriesComponents/Categories.module.scss";
import { Title } from "../components/Titles/Titles";
import TransactionCard from "../components/Cards/TransactionCard";
import MainContainer from "../components/Containers/MainContainer";

import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useCategoriesGet } from "../queries/category";
import { useTransactionsGet } from "../queries/transaction";

const Categories = () => {
    //SEARCH FILTERS
    const [timeSpan, setTimeSpan] = useState(
        DateTime.now().minus({
            days: 7,
        }).toISODate()
    );

    const [categories, setCategories] = useState("");
    const [sortingField, setSortingField] = useState("dateSort");
    const [order, setOrder] = useState("asc");
    const {data: ctgs, isFetched: isCtgsFetched} = useCategoriesGet();
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if(ctgs) setCategories(ctgs.data[0].Id);
        console.log(ctgs);
    },  [ctgs]);

    const { data: FilteredTransactions, refetch: fetchTransactions } = 
        useTransactionsGet({
            firstDate: timeSpan,
            category: categories ? categories : undefined,
            [sortingField]: order,
            skip: skip,
            take: 10,
            key: "CategoriesTrs",
        });

    return(
        <MainContainer>
            <Title>Categorias</Title>

            <div className={styles.container}>
                {/* FILTERS */}
                <div className={styles.filters}>
                    {/* TIME SPAN */}
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label htmlFor="timeSpan">Time Span: </label>
                            <select name="timeSpan" onChange={(e) => {setTimeSpan(e.target.value);}}>
                                <option value={DateTime.now().minus({days: 7,}).toISODate()}>
                                    Últimos 7 dias
                                </option>
                                <option value={DateTime.now().minus({days: 30,}).toISODate()}>
                                    Últimos 30 dias
                                </option>
                                <option value={DateTime.now().minus({days: 90,}).toISODate()}>
                                    Últimos 90 dias
                                </option>
                                <option value={DateTime.now().minus({days: 365,}).toISODate()}>
                                    Últimos 365 dias
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* CATEGORIES */}
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label htmlFor="categories">Categorias: </label>
                            {isCtgsFetched ? (
                                <select name="categories" onChange={(e) => {setCategories(e.target.value);}}>
                                    <option value="">Todas</option>
                                    {ctgs?.data?.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            ): (<div>Carregando...</div>)}
                        </div>
                    </div>

                    {/* SORTING FIELD */}
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label htmlFor="sortingField">Filtrar por: </label>
                            <select name="sortingField" onChange={(e) => {setSortingField(e.target.value);}}>
                                <option value="dateSort">Data</option>
                                <option value="priceSort">Valor</option>
                            </select>
                        </div>
                    </div>

                     {/* ASC OR DESC */}
                     <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <label htmlFor="order">Ordem: </label>
                            <select name="order" onChange={(e) => {setOrder(e.target.value);}}>
                                    <option value="asc">Crescente</option>
                                    <option value="desc">Decrescente</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/* RESULTS */}
                <div className={styles.results}>
                    <button className={styles.btn} onClick={() => fetchTransactions()}>
                        Exibir Resultados
                    </button>
                    <div className={styles.inner}>
                        {FilteredTransactions && FilteredTransactions.data?.map((transaction, index) => {
                            return <TransactionCard 
                                key={index} 
                                category={transaction.category.name} 
                                money={transaction.money}
                                date={DateTime.fromISO(transaction.date).toISODate()}
                                description={transaction.info}
                                title={transaction.title}
                                />
                        })}

                    </div>

                </div>
            </div>
        </MainContainer>

    ) 
        
}

export default Categories;