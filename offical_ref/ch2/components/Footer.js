import React,{PropTypes} from 'react';
import FilterLink from '../containers/FilterLink';
import {VisibilityFilters} from '../actions';
import Link from './Link';

const Footer = () => {
  return  (
    <div className="footer">
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
    Show all
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
    Show completed
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
    Show active
    </FilterLink>
    </div>
  )
}

export default Footer;
