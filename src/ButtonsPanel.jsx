import React from 'react';
import './styleButtonsPanel.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { runningValue, toggleRunning } from './state/runningSlice.js';
import { resetGen } from './state/generationCountSlice.js';

export const ButtonsPanel = ({ resetGameField, setGridHandler }) => {
  const dispatch = useDispatch();
  const running = useSelector(runningValue);

  return (
    <div className='buttons-panel-background'>
      <div className='buttons-panel'>
        <Link
          to='/records'
          className='records-btn btn link'
        >
          <span className='link-name'>Records</span>
        </Link>
        <Link
          to='/rules'
          className='check-rules-btn btn link'
        >
          <span className='link-name'>Check rules</span>
        </Link>
        <button
          className='clear-btn btn'
          onClick={() => {
            if (running) {
              dispatch(toggleRunning(true));
            }
            setGridHandler([resetGameField()]);
            dispatch(resetGen());
          }}
        >
          Clear
        </button>
        <Link
          to='/settings'
          className='settings-btn btn link'
        >
          <span className='link-name'>Settings</span>
        </Link>
      </div>
    </div>
  );
};
