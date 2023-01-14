import { useState } from "react";
import "./assets/scss/main.scss";
import Modal from "./components/Modal";

function App() {
    const [openModal, setOpenModal] = useState(false);

    /* список item-ов, если есть в localStorage ключ items c массивом item-ов,
    то присваиваем массив переменной. Если ключа нет, то по умолчанию присваиваем пустой массив */
    let items = JSON.parse(localStorage.getItem("items") || "[]");
    
    const addItem = (item) => {
        // добавляем данные полей с формы создания item-а в массив
        items.push(item);
        
        // записываем массив в localStorage, чтобы при перезагрузке страницы они не пропадали
        localStorage.setItem("items", JSON.stringify(items));
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header__logo">
                    Stock
                    <br /> center
                </div>

                <div className="header__descr">Items in stock</div>

                <div className="header__burger">
                    <button className="burger">
                        <div className="burger__line"></div>
                        <div className="burger__line"></div>
                        <div className="burger__line"></div>
                    </button>
                </div>
            </header>

            <main className="main">
                <div className="main__content">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Price, USD</th>
                                <th>Date and time</th>
                            </tr>

                            {items.length ? (
                                items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="empty" colSpan={4}>
                                        Пока пусто
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="center-block">
                    <button
                        className="btn btn--big"
                        onClick={() => setOpenModal(true)}
                    >
                        New item
                    </button>
                </div>
            </main>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                addItemProp={addItem}
            />
        </div>
    );
}

export default App;
