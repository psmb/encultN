import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';

@connect(state => ({
  about: state.about,
}))
export default class Donate extends Component {
  static propTypes = {
    about: PropTypes.object,
  }

  render() {
    const __ = puttext();
    return (
      <div className='fixed-width'>
        <div className='Donate'>
          <div className='row'>
            <div className='medium-8 columns'>
              <h1 className='marginVertical-double mdl-typography--display-1-color-contrast'>{__('Пожертвовать')}</h1>
              <div className='marginBottom-triple mdl-typography--body-1-color-contrast'>
                {__('Здесь вы можете сделать пожертвование на этот и другие подобные проекты, способствующие изучению и развитию межкультурных отношений')}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='medium-10 medium-offset-1 columns'>
              <form target='_blank' action='https://money.yandex.ru/eshop.xml' method='post'>

                <input type='hidden' name='shopId' value='105704'/>
                <input type='hidden' name='scid' value='38251'/>
                <input type='hidden' name='customerNumber' value={Date.now()}/><br/><br/>

                {__('Сумма')}:<br/>
                <input name='sum' size='43' placeholder={__('введите сумму заказа в рублях')}/><br/>

                {__('Способ оплаты')}:<br/><br/>
                <input name='paymentType' value='PC' type='radio'/>{__('Оплата со счета в Яндекс.Деньгах')}<br/>
                <input name='paymentType' value='AC' type='radio'/>{__('Оплата банковской картой')}<br/>
                <input name='paymentType' value='GP' type='radio'/>{__('Оплата по коду через терминал')}<br/>
                <input name='paymentType' value='WM' type='radio'/>{__('Оплата cо счета WebMoney')}<br/>
                <input name='paymentType' value='AB' type='radio'/>{__('Оплата через Альфа-Клик')}<br/>
                <input name='paymentType' value='PB' type='radio'/>{__('Оплата через Промсвязьбанк')}<br/>
                <input name='paymentType' value='MA' type='radio'/>{__('Оплата через MasterPass')}<br/>

                <input type='submit' value={__('Пожертвовать')}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
