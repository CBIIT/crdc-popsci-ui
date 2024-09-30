/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  AccordionSummary,
  Button,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  resetAllData, chunkSplit,
  SearchView, SearchBoxGenerator, UploadModalGenerator,
} from '@bento-core/local-find';
import { FacetFilter, ClearAllFiltersBtn } from '@bento-core/facet-filter';
import ToolTip from '@bento-core/tool-tip';
import store from '../../../store';
import { facetsConfig, facetSectionVariables } from '../../../bento/dashTemplate';
import { facetSectionTooltip } from '../../../bento/dashboardTabData';
import FacetFilterThemeProvider from './FilterThemeConfig';
import styles from './BentoFacetFilterStyle';
import {
  getAllSubjectIds, getAllIds,
} from './BentoFilterUtils';

const CustomExpansionPanelSummary = withStyles({
  root: {
    // marginBottom: -1,
    // paddingTop: 6,
    // paddingLeft: 14,
    // paddingRight: 14,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    display: 'block',
    '&$expanded': {
      // margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

// Generate SearchBox Component
const { SearchBox } = SearchBoxGenerator({
  functions: {
    getSuggestions: async (searchType) => {
      try {
        const response = await getAllIds(searchType).catch(() => []);
        return response && response[searchType] instanceof Array
          ? response[searchType].map((id) => ({ type: searchType, title: id }))
          : [];
      } catch (e) {
        return [];
      }
    },
  },
  config: {
    inputPlaceholder: 'e.g. MSB-00140, MSB-00205', // The textarea placeholder
    noOptionsText: 'No matching items found',      // The text to display when no autocomplete opts are found
    searchType: 'subjectIds',                      // The search type to use for the autocomplete
  },
});

// Generate UploadModal Component
const { UploadModal } = UploadModalGenerator({
  functions: {
    searchMatches: async (inputArray) => {
      try {
        // Split the search terms into chunks of 500
        const caseChunks = chunkSplit(inputArray, 500);
        const matched = (await Promise.allSettled(caseChunks.map((chunk) => getAllSubjectIds(chunk))))
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value || [])
          .flat(1);

        // Combine the results and remove duplicates
        const unmatched = new Set(inputArray);
        matched.forEach((obj) => unmatched.delete(obj.subject_id));
        return { matched, unmatched: [...unmatched] };
      } catch (e) {
        return { matched: [], unmatched: [] };
      }
    },
  },
  config: {
    title: 'Upload Participant Set',                   // The title of the modal
    inputPlaceholder: 'eg. PARTICIPANT-123',           // The placeholder text for the textarea input
    inputTooltip: 'Add the participant indentifier.',  // The tooltip text for the textarea input section. Empty = no tooltip
    uploadTooltip: 'Add the participant indentifier.', // The tooltip text for the upload button section. Empty = no tooltip
    accept: '.csv,.txt',                        // The file types that can be uploaded (must be text/* files only)
    maxSearchTerms: 1000,                       // The maximum number of search terms that can be searched for. See note below.
  },
});

const BentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
}) => {
  /**
  * Clear All Filter Button
  * Custom button component
  * bento core params
  * 1. onClearAllFilters - dispatch clear all filters
  * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    const iconColor = disable ? '#AEBDBE' : '#415153';
    const borderColor = disable ? '#ADADAD' : '#435C60';
    
    const handleClearAll = () => {
      onClearAllFilters();
      store.dispatch(resetAllData());
    };
  
    return (
      <div className={classes.floatRight}>
        <Button
          id="button_sidebar_clear_all_filters"
          variant="outlined"
          disabled={disable}
          onClick={handleClearAll}
          className={classes.customButton}
          classes={{ root: classes.clearAllButtonRoot }}
          style={{ border: `1px solid ${borderColor}` }}
        >
          <svg 
            className={classes.resetIcon}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: iconColor }}
          >
            <path 
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.74 5.97999C11.74 2.80999 9.18001 0.24999 6.01001 0.23999C4.41001 0.23999 2.88001 0.90999 1.80001 2.07999V1.00999C1.80001 0.58999 1.46001 0.23999 1.03001 0.23999C0.60001 0.23999 0.26001 0.58999 0.26001 1.00999V4.06999C0.26001 4.48999 0.60001 4.83999 1.03001 4.83999H4.09001C4.51001 4.83999 4.86001 4.49999 4.86001 4.06999C4.86001 3.63999 4.52001 3.29999 4.09001 3.29999H2.76001C4.24001 1.50999 6.89001 1.25999 8.68001 2.73999C10.47 4.21999 10.72 6.86999 9.24001 8.65999C8.45001 9.62999 7.26001 10.19 6.00001 10.19C5.58001 10.19 5.23001 10.53 5.23001 10.96C5.23001 11.38 5.57001 11.73 6.00001 11.73H6.02001C9.18001 11.72 11.74 9.14999 11.74 5.97999Z"
            />
          </svg>
        </Button>
        <span className={disable ? classes.resetTextDisabled : classes.resetText}>
          Clear all filtered selections
        </span>
      </div>
    );
  };

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section }) => {
    const { name, expandSection } = section;
    const { hasSearch = false, hasArrowDropDownIcon = true } = facetSectionVariables[name];

    const [expanded, setExpanded] = useState(expandSection);
    const [showSearch, setShowSearch] = useState(true);

    const toggleSearch = (e) => {
      e.stopPropagation();
      setShowSearch(!showSearch);
    };

    const collapseHandler = () => {
      setExpanded(!expanded);
    };

    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={hasArrowDropDownIcon && (
            <ArrowDropDownIcon
              classes={{ root: classes.dropDownIconSubSection }}
              style={{ fontSize: 26 }}
            />
          )}
          onClick={collapseHandler}
          id={section}
          className={hasArrowDropDownIcon ? classes.customExpansionPanelSummaryRoot : classes.customExpansionPanelSummaryRoot2}
        >
          <div className={classes.sectionSummaryTextContainer}>
            <div className={classes.sectionSummaryTitle}>
              {name}
              <ToolTip
                classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }}
                enterDelay="0"
                placement="top"
                title={facetSectionTooltip.tooltipText}
              >
                <img src={facetSectionTooltip.src} alt={facetSectionTooltip.alt} className={classes.icon}/>
              </ToolTip>
            </div>
            {hasSearch && (
              <div className={classes.findCaseButton} onClick={toggleSearch}>
                <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FacetLocalFindSearchIcon.svg" className={classes.findCaseIcon} alt="search" />
              </div>
            )}
          </div>
          {hasSearch && (
            <SearchView
              classes={classes}
              SearchBox={SearchBox}
              UploadModal={UploadModal}
              hidden={!expanded || !showSearch}
            />
          )}
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet, facetClasses }) => {
    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={(
            <ArrowDropDownIcon
              classes={{ root: classes.dropDownIconSubSection }}
              style={{ fontSize: 26 }}
            />
          )}
          id={facet.label}
          className={classes.customExpansionPanelSummaryRootView}
        >
          <div
            id={facet.label}
            className={clsx(
              classes.sectionSummaryText,
              // Help to change "activeFacetFilter by Participants" to activeFacetFilter_by_Participants
              classes[facetClasses.replace(/\s/g, '_')])
            }
          >
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  return (
    <div>
      <FacetFilterThemeProvider>
        <ClearAllFiltersBtn
          Component={CustomClearAllFiltersBtn}
          // Component={CustomClearAllFiltersBtn}
          activeFilters={activeFilters}
        />
        <FacetFilter
          data={searchData}
          facetSectionConfig={facetSectionVariables}
          facetsConfig={facetsConfig}
          CustomFacetSection={CustomFacetSection}
          CustomFacetView={CustomFacetView}
        />
      </FacetFilterThemeProvider>
    </div>
  );
};

export default withStyles(styles)(BentoFacetFilter);
