import MainContainer from "../components/Containers/MainContainer";
import Searchbar from "../components/homeComponents/Searchbar";
import { Title } from "../components/Titles/Titles";
import CategoryCard from "../components/Cards/CategoryCard";
import TransactionCard from "../components/Cards/TransactionCard";
import styles from "../styles/homeComponents/Home.module.scss";
import HomeProfile from "../components/homeComponents/HomeProfile";

import { DateTime } from "luxon";
import { useTransactionsGet } from "../queries/transaction";
import { useCategoriesSum } from "../queries/category";
import { useEffect } from "react";

const Home = () => {
  //LATEST TRS
  const { data: transactions, refetch: fetchTransactions } = useTransactionsGet(
    {
      key: "Trs_Latest",
      skip: 0,
      take: 5,
    }
  );

  const { data: CategoriesSum } = useCategoriesSum();
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <MainContainer optionClass={styles.container}>
      <div className={styles.main}>
        {/* SEARCHBAR */}
        <div className={styles.searchbar}>
          <Searchbar />
        </div>

        {/* CATEGORIES */}
        <div className={styles.categories}>
          <Title>Categorias dos Últimos 30 dias</Title>
          <div className={styles.content}>
            {/* SUM */}
            {CategoriesSum && CategoriesSum.data.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  category={category.transactionCategoryId}
                  money={category._sum.money.toFixed(2)}
                />
              )
            })}
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className={styles.transactions}>
          <Title>Últimas Transações</Title>
          <div className={styles.content}>
            {/* LAST TRANSACTIONS */}
            {transactions && 
              transactions.data.map((transaction, index) => {
                console.log(transaction.category.name)
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    date={DateTime.fromISO(transaction.date).toISODate()}
                    money={transaction.money.toFixed(2)}
                    description={transaction.info}
                    title={transaction.title}
                  />
                )
              })}
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <HomeProfile />
      </div>
    </MainContainer>
  );
};

export default Home;