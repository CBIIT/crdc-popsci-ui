import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { queryAutocompleteAPI, SEARCH_DATAFIELDS, SEARCH_KEYS } from '../../../bento/search';
import { PUBLIC_ACCESS } from '../../../bento/siteWideConfig';
import { accessLevelTypes } from '@bento-core/authentication';
import { SearchBarGenerator } from '@bento-core/global-search';
import {CUSTOM_STYLES} from './searchBarStyle';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const SearchBarContainer = styled.div`
    display: flex;
`;

const SearchBar = (props) => {
  const location = useLocation();

  const isSignedIn = useSelector((state) => state && state.login.isSignedIn);
  const isAdmin = useSelector((state) => state.login && state.login.role && state.login.role === 'admin');
  const hasApprovedArms = useSelector((state) => state.login.acl
    && state.login.acl.some((arm) => arm.accessStatus === 'approved'));
  const authenticated = PUBLIC_ACCESS === accessLevelTypes.METADATA_ONLY
    || (isSignedIn && (hasApprovedArms || isAdmin));

  const SearchBarConfig = {
    classes: CUSTOM_STYLES(),
    config: {
      placeholder: "",
      query: async (search) => queryAutocompleteAPI(search, !authenticated),
      searchKeys: authenticated ? SEARCH_KEYS.private : SEARCH_KEYS.public,
      searchFields: authenticated ? SEARCH_DATAFIELDS.private : SEARCH_DATAFIELDS.public,
      showSearchButton: true,
      displaySearchIcon: false,
    },
  };
  const { SearchBar } = SearchBarGenerator(SearchBarConfig);
  
  return (
    <SearchBarContainer>
      <label htmlFor="global_search_input" style={{ visibility: 'hidden' }}>
        Search CTDC
      </label>
      {!location.pathname.match('/search') && <SearchBar clearable={true}/>}
    </SearchBarContainer>
  );
};

export default SearchBar;
