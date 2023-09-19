import React, {useEffect, useRef, useState} from 'react';

import {useAppDispatch} from '../app/hooks';

import '../css/editableCell.css';
import {updateRate} from '../reducers/commonSlice';
import {ExchangeType} from '../app/enums';

interface EditableCellProps {
  exchangeType: ExchangeType;
  rateLabel: string;
  rateValue: number;
}

function EditableCell({exchangeType, rateValue, rateLabel}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditButtonShown, setIsEditButtonShown] = useState(false);
  const [editedValue, setEditedValue] = useState('');

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
        <button className="save-button" onClick={handleSaveClick}>
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
        {isEditButtonShown && (
          <div className="edit-icon-container">
            <button className="edit-icon" onClick={handleEditClick}>
              ✎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditableCell;
