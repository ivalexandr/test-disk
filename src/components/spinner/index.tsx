import s from './style.module.css';

export const Spinner = () => {
  return (
    <div className={ s['lds-roller'] }>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
  )
};
