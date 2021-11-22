import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateHomeCryptoSelect } from '../../redux/actions/home-crypto-select';
import { switchCurrency } from '../../redux/actions/currency-switch';

import { Arrow, Alt, Close } from '../../icons';
import './crypto_select.css';

export default function HomeCryptoSelect() {
  const dispatch = useDispatch();
  const selects = useSelector((state) => state.homeCryptoSelect);
  const currency = useSelector((state) => state.currencySwitch);

  const [toggleModal, setToggleModal] = useState(false);
  const [modalParams, setModalParams] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [initInputValue, setInitInputValue] = useState('');
  const [preInputValue, setPreInputValue] = useState('');

  useEffect(() => {
    if (toggleModal) {
      document.body.classList.add('toggle-mode');
    } else {
      document.body.classList.remove('toggle-mode');
    }
  }, [toggleModal]);

  const handleSwitch = () => {
    window.scrollTo(0, 0);

    dispatch(switchCurrency());
  };

  const handleModal = (params, initValue) => {
    setToggleModal(true);
    setModalParams(params);

    setInputValue('');
    setInitInputValue(initValue);
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value !== initInputValue) {
      setInputValue(value);
    } else {
      setInputValue('');
    }
  };

  const handleClose = () => {
    window.scrollTo(0, 0);

    setToggleModal(false);

    if (!inputValue || inputValue === preInputValue) return;

    dispatch(updateHomeCryptoSelect(modalParams, inputValue));

    setPreInputValue(inputValue);
  };

  const options = [
    { params: 'currency', data: currency.name, func: handleSwitch },
    {
      params: 'timeperiod',
      data: selects.timeperiod.filter((i) => i.checked)[0].name,
      value: selects.timeperiod.filter((i) => i.checked)[0].name,
      icon: <Arrow />,
      func: handleModal,
    },
    {
      params: 'totalpage',
      data: selects.totalpage.filter((i) => i.checked)[0].name,
      value: selects.totalpage.filter((i) => i.checked)[0].name,
      icon: <Arrow />,
      func: handleModal,
    },
    {
      params: 'order',
      data: selects.order.filter((i) => i.checked)[0].shortname,
      value: selects.order.filter((i) => i.checked)[0].name,
      icon: <Alt dir={selects?.order.filter((i) => i.checked)[0].dir} />,
      func: handleModal,
    },
  ];

  return (
    <>
      <div className="home-crypto-select">
        {options.map(({ params, data, value, icon, func }, idx) => (
          <button key={idx} type="button" onClick={() => func(params, value)}>
            <span>{data}</span>
            {icon}
          </button>
        ))}
      </div>

      {toggleModal && (
        <>
          <div className="home-crypto-modal-container">
            <button
              className="home-crypto-modal-close"
              type="button"
              onClick={handleClose}
            >
              <Close />
            </button>

            <div className="home-crypto-modal-select-container">
              {selects[modalParams].map(({ name, checked }, idx) => (
                <label
                  htmlFor={name}
                  key={idx}
                  className="home-crypto-modal-select"
                >
                  <input
                    type="radio"
                    id={name}
                    value={name}
                    checked={inputValue ? inputValue === name : checked}
                    onChange={handleChange}
                  />
                  <span className="radio" />
                  <span
                    className="text"
                    style={{
                      textTransform:
                        modalParams === 'timeperiod'
                          ? 'uppercase'
                          : 'capitalize',
                    }}
                  >
                    {name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="home-crypto-modal-overlay" />
        </>
      )}
    </>
  );
}
