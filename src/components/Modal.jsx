import React, { useState } from "react";

const Modal = ({ open, onClose, addItemProp }) => {
    if (!open) return null;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    const addZeroDate = (prop) => prop <= 9 ? '0' : '';

    const formatDateTime = (date) => {
        const day = new Date(date).getDate();
        const month = new Date(date).getMonth() + 1;
        const year = new Date(date).getFullYear();
        const hours = new Date(date).getHours();
        const minutes = new Date(date).getMinutes();
        const seconds = new Date(date).getSeconds();
        const fullDate = `${addZeroDate(day)}${day}.${addZeroDate(month)}${month}.${year}`;
        const time = `${addZeroDate(hours)}${hours}:${addZeroDate(minutes)}${minutes}:${addZeroDate(seconds)}${seconds}`;
    
        return `${fullDate} ${time}`;
    };

    const formatUSD = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }

    const addItem = () => {
        if (Number(price) < 0) {
            setErrorPrice(true);
            return;
        }

        if (title.length == 0 || price.length == 0 || date.length == 0) {
            setError(true);
            return;
        }

        addItemProp({ title, price: formatUSD(price), date: formatDateTime(date) });
        setTitle("");
        setPrice("");
        setDate("");
        onClose();
    };

    return (
        <div className="modal-wrapper" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__content">
                    <div className="modal__head">
                        <h2 className="modal__title">New item</h2>

                        <button onClick={onClose}>
                            <i className="close-icon"></i>
                        </button>
                    </div>

                    <div className="modal__main">
                        <form className="form" action="">
                            <div className="form__item">
                                <label className="form__label" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className={`inp ${
                                        error && !title.length
                                            ? "inp--error"
                                            : ""
                                    }`}
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                />
                                {error && !title.length ? (
                                    <div className="text-error">
                                        Fill in the field
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form__item">
                                <label className="form__label" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    className={`inp ${
                                        (errorPrice && Number(price) < 0) ||
                                        (error && !price.length)
                                            ? "inp--error"
                                            : ""
                                    }`}
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(event) =>
                                        setPrice(event.target.value)
                                    }
                                />

                                {errorPrice && Number(price) < 0 ? (
                                    <div className="text-error">
                                        Invalid price
                                    </div>
                                ) : (
                                    ""
                                )}
                                {error && !price.length ? (
                                    <div className="text-error">
                                        Fill in the field
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form__item">
                                <label className="form__label" htmlFor="date">
                                    Date and time
                                </label>
                                <input
                                    className={`inp ${
                                        error && !date.length
                                            ? "inp--error"
                                            : ""
                                    }`}
                                    type="datetime-local"
                                    id="date"
                                    value={date}
                                    onChange={(event) =>
                                        setDate(event.target.value)
                                    }
                                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                                    min="2022-01-01T00:00"
                                    max="2023-12-31T00:00"
                                />
                                {error && !date.length ? (
                                    <div className="text-error">
                                        Fill in the field
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="modal__footer">
                        <button className="btn btn--dark" onClick={onClose}>
                            Close
                        </button>
                        <button className="btn" onClick={addItem}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
