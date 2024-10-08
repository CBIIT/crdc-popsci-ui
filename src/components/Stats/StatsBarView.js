import React from 'react';
import { withStyles } from '@material-ui/core';
import {cn } from '@bento-core/util';

const MAX_STATS_ALLOWED = 7; // Maximum number of stats allowed

/**
 * The StatsBar component is a horizontal bar that shows some quick stats
 *
 * @param {object} classes Classes
 * @param {object} stats Statistics to show
 * @param {object} styles Customized configurations used by both `styles` and withStyles(), below
 *
 * @returns {object} A React subcomponent
 */
const StatsBar = ({
  classes, stats, styles,
}) => {
  const countClasses = classes.statCount;
  const iconClasses = classes.statsIcon;
  const titleClasses = classes.statTitle;
  const truncatedListOfStats = stats.slice(0, MAX_STATS_ALLOWED);

  /**
   * An icon for a stat
   *
   * @param {string} alt The alt text
   * @param {string} src The image's source media
   *
   * @returns {object} A React subcomponent
   */
  const StatsBarIcon = ({
    alt, src, specificIconclass
  }) => (
    <div className={cn(iconClasses, specificIconclass)}>
      <img src={src} alt={alt} />
    </div>
  );

  /**
   * The title and count for a single stat
   *
   * @param {number} countId DOM id for the count
   * @param {boolean} isTitleFirst Whether to show the title before the count
   * @param {string} title Name of the stat
   * @param {string} titleId DOM id for the title
   * @param {number} val The value to show
   *
   * @param {number} titleId DOM id for the title
   * @returns {object} A React subcomponent
   */
  const StatsBarTitleAndCount = ({
    countId,
    isTitleFirst,
    title,
    titleId,
    val,
  }) => {
    if (isTitleFirst) {
      return (
        <div>
          <div className={titleClasses} id={titleId}>
            {title}
          </div>
          <div className={countClasses} id={countId}>
            {val}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={countClasses} id={countId}>
          {val}
        </div>
        <div className={titleClasses} id={titleId}>
          {title || 0}
        </div>
      </div>
    );
  };

  /**
   * A group of things to show for a single stat
   *
   * @param {number} index Numbering assigned to this stats group
   * @param {object} stat Statistic to show
   *
   * @returns {object} A React subcomponent
   */
  const StatsBarGroup = ({
    index, stat,
  }) => {
    const countId = `statsbar_count_${index + 1}`;
    const isTitleFirst = styles.global.statTitleFirst;
    const titleId = `statsbar_title_${index + 1}`;
    const specificIconclass = classes[`statsbar_icon_${index+1}`]

    return (
      <div className={classes.statsGroup} >
        <StatsBarIcon
          alt={stat.statIconAlt}
          src={stat.statIconSrc}
          specificIconclass={specificIconclass}
        />
        <StatsBarTitleAndCount
          countId={countId}
          isTitleFirst={isTitleFirst}
          title={stat.name}
          titleId={titleId}
          val={stat.val}
        />
      </div>
    );
  };

  return (
    <>
      <div className={classes.statsSection}>
        <div className={classes.box}>
          {truncatedListOfStats.map((stat, index) => (
            <StatsBarGroup
              key={stat.statTitle}
              index={index}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </>
  );
};

/**
 * Used by withStyles(), below
 */
const styles = () => ({
  statsSection: (props) => ({
    width: '100%',
    background: props.styles.global.background ? props.styles.global.background : '#8DCAFF',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  shadow: {
    width: '100%',
    height: '10px',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))',
    position: 'absolute',
  },
  box: (props) => ({
    display: 'inline-flex',
    // height: props.styles.global.height ? props.styles.global.height : '47px',
    margin: '0 auto',
    ...props.styles.box,
  }),
  statTitle: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    float: props.styles.statTitle ? props.styles.statTitle.float ? props.styles.statTitle.float : 'left' : 'left',
    color: props.styles.statTitle ? props.styles.statTitle.color ? props.styles.statTitle.color : '#062D4F' : '#062D4F',
    fontFamily: props.styles.statTitle ? props.styles.statTitle.fontFamily ? props.styles.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontWeight: props.styles.statTitle ? props.styles.statTitle.fontWeight ? props.styles.statTitle.fontWeight : 600 : 600,
    fontSize: props.styles.statTitle ? props.styles.statTitle.fontSize ? props.styles.statTitle.fontSize : '11px' : '11px',
    letterSpacing: '1px',
    margin: '14px 8px 0px 0px',
    textTransform: props.styles.statTitle ? props.styles.statTitle.textTransform ? props.styles.statTitle.textTransform : 'uppercase' : 'uppercase',
    ...props.styles.statTitle,
  } : {
    float: props.styles.statTitle ? props.styles.statTitle.float ? props.styles.statTitle.float : 'left' : 'left',
    color: props.styles.statTitle ? props.styles.statTitle.color ? props.styles.statTitle.color : '#263960' : '#263960',
    fontFamily: props.styles.statTitle ? props.styles.statTitle.fontFamily ? props.styles.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontSize: props.styles.statTitle ? props.styles.statTitle.fontSize ? props.styles.statTitle.fontSize : '11px' : '11px',
    fontWeight: props.styles.statTitle
      ? props.styles.statTitle.fontWeight ? props.styles.statTitle.fontWeight : 500 : 500,
    margin: props.styles.statTitle ? typeof props.styles.statTitle.margin !== 'undefined' ? props.styles.statTitle.margin : '6px 0px 0px 15px' : '6px 0px 0px 15px',
    textTransform: props.styles.statTitle ? props.styles.statTitle.textTransform ? props.styles.statTitle.textTransform : 'uppercase' : 'uppercase',
    width: props.styles.statTitle ? props.styles.statTitle.width ? props.styles.statTitle.width : '150px' : '150px',
    textAlign: 'left',
    ...props.styles.statTitle,
  }),
  statCount: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    display: 'inline-block',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#0467BD' : '#0467BD',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    fontWeight: 600,
    ...props.styles.statCount,
  } : {
    width: props.styles.statCount ? props.styles.statCount.width ? props.styles.statCount.width : '100%' : '100%',
    textAlign: props.styles.statCount ? props.styles.statCount.textAlign ? props.styles.statCount.textAlign : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#263960' : '#263960',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'none' : 'none',
    fontWeight: 600,
    ...props.styles.statCount,
  }),
  statsGroup: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    // spacing between stats
    margin: props.styles.statsGroup ? props.styles.statsGroup.margin ? props.styles.statsGroup.margin : '4px 32px' : '4px 32px',
  } : {
    margin: props.styles.statsGroup ? props.styles.statsGroup.margin ? props.styles.statsGroup.margin : '4px 0px' : '4px 0px',
    padding: props.styles.statsGroup ? props.styles.statsGroup.padding ? props.styles.statsGroup.padding : '4px 40px 10px 60px' : '4px 40px 10px 60px',
    borderRight: props.styles.statsGroup ? props.styles.statsGroup.borderRight ? props.styles.statsGroup.borderRight : '4px solid #0B3556' : '4px solid #0B3556',
    '&:last-child': {
      borderRight: 'none'
    },
    ...props.styles.statsGroup,
    display: 'flex',
    flexDirection: 'row'
  }),
  statsIcon: (props) => ({
    width: props.styles.statsIcon ? props.styles.statsIcon.width ? props.styles.statsIcon.width : 'auto' : 'auto',
    height: props.styles.statsIcon ? props.styles.statsIcon.height ? props.styles.statsIcon.height : 'auto' : 'auto',
    ...props.styles.statsIcon,
  }),

  statsbar_icon_2: (props) => ({
    margin: '0px 0px 5px 0px'
  }),
  statsbar_icon_3: (props) => ({
    margin: '0px 0px 5px 0px'
  }),
  statsbar_icon_4: (props) => ({
    margin: '0px 0px 5px 0px'
  }),
  
});

StatsBar.defaultProps = {
  classes: {},
  styles: {},
};

const StyledStatsBar = withStyles(styles)(StatsBar);
export default StyledStatsBar;
