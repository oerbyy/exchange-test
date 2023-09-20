import React, {useEffect, useRef, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../app/hooks';

import '../css/editableCell.css';
import {updateRate} from '../reducers/commonSlice';
import {ExchangeType} from '../app/enums';
import {getPercentDifference} from '../helpers/calculationsHelper';
import {RATE_PERCENT_LIMIT} from '../app/constants';

function isRateWithinLimits(
  {exchangeType, rateValue, rateLabel}: EditableCellProps,
  ratesOriginal: CurrencyDTO[]
): boolean {
  const [base_ccy, ccy] = rateLabel.split('/');
  const originalRate = ratesOriginal.find((rate) => rate.base_ccy === base_ccy && rate.ccy === ccy);

  if (!originalRate) return false;

  const rateOriginalValue =
    exchangeType === ExchangeType.Buy ? originalRate.buy : originalRate.sale;
  const difference = getPercentDifference(rateOriginalValue, rateValue);

  return difference <= RATE_PERCENT_LIMIT;
}

interface EditableCellProps {
  exchangeType: ExchangeType;
  rateLabel: string;
  rateValue: number;
}

function EditableCell({exchangeType, rateValue, rateLabel}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditButtonShown, setIsEditButtonShown] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const ratesOriginal: CurrencyDTO[] = useAppSelector((state) => state.counter.ratesOriginal);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(rateValue.toString());
  };

  const handleSaveClick = () => {
    dispatch(updateRate({exchangeType, rateLabel, rateValue: Number(editedValue)}));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') handleSaveClick();
    if (e.key === 'Escape') handleCancelClick();
  };

  const isRateAcceptable = isRateWithinLimits(
    {exchangeType, rateValue: Number(editedValue), rateLabel},
    ratesOriginal
  );

  return (
    <div className="editable-text" onMouseLeave={() => setIsEditButtonShown(false)}>
      <div hidden={!isEditing}>
        <input
          type="number"
          min={0}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          ref={inputRef}
          onKeyUp={onKeyPress}
        />
        <button className="save-button" onClick={handleSaveClick} disabled={!isRateAcceptable}>
          <span role="img" aria-label="Save">
            ✔️
          </span>
        </button>
        <button className="cancel-button" onClick={handleCancelClick}>
          <span role="img" aria-label="Cancel">
            ❌
          </span>
        </button>
      </div>

      <div hidden={isEditing}>
        <div className="text-container" onMouseEnter={() => setIsEditButtonShown(true)}>
          {rateValue}
        </div>

        {/* 'hidden' is used instead of conditional rendering for purpose of persisting in DOM for testing reasons */}
        <div hidden={!isEditButtonShown} className="edit-icon-container">
          <button className="edit-icon" onClick={handleEditClick}>
            ✎
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditableCell;
