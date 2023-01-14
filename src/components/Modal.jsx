import React, { useState } from "react";

const Modal = ({ open, onClose, addItemProp }) => {
    if (!open) return null;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    const addItem = () => {
        addItemProp({title, price, date});
        setTitle('');
        setPrice('');
        setDate('');
    }

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
                                    className="inp"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>

                            <div className="form__item">
                                <label className="form__label" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    className="inp"
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>

                            <div className="form__item">
                                <label className="form__label" htmlFor="date">
                                    Date and time
                                </label>
                                <input
                                    className="inp"
                                    type="datetime-local"
                                    id="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                />
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

export default Modal