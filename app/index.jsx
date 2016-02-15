'use strict';

/* eslint-disable no-unused-vars */

import React from 'react';
import reactDOM from 'react-dom';
import ListItem from './components/listItem.jsx';
import CrudList from './components/crudList.jsx';

reactDOM.render(<CrudList resource="kittens" />,
  document.getElementById('app'));
