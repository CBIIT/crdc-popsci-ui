import React from 'react';
import { withStyles } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import externalLinkIcon from '../About/assets/About-ExternalIcon.svg';
import { safeImageUrl, safeLinkUrl } from './markdownUrls';

const MarkdownContent = ({ classes, markdown }) => {
  const components = {
    h2: ({ children }) => <h2 className={classes.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={classes.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={classes.h4}>{children}</h4>,
    h5: ({ children }) => <h5 className={classes.h5}>{children}</h5>,
    h6: ({ children }) => <h6 className={classes.h6}>{children}</h6>,
    p: ({ children }) => <p className={classes.paragraph}>{children}</p>,
    ul: ({ children }) => <ul className={classes.list}>{children}</ul>,
    ol: ({ children }) => <ol className={classes.list}>{children}</ol>,
    li: ({ children }) => <li className={classes.listItem}>{children}</li>,
    blockquote: ({ children }) => <blockquote className={classes.blockquote}>{children}</blockquote>,
    table: ({ children }) => (
      <div className={classes.tableWrapper} tabIndex="0" role="region" aria-label="Scrollable content table">
        <table className={classes.table}>{children}</table>
      </div>
    ),
    th: ({ children }) => <th className={classes.tableHeader}>{children}</th>,
    td: ({ children }) => <td className={classes.tableCell}>{children}</td>,
    a: ({ href, children }) => {
      const safeHref = safeLinkUrl(href);
      if (!safeHref) return <span>{children}</span>;
      const external = safeHref.startsWith('https://');
      return (
        <a
          className={classes.link}
          href={safeHref}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
          {external && (
            <img className={classes.externalIcon} src={externalLinkIcon} alt="" aria-hidden="true" />
          )}
        </a>
      );
    },
    img: ({ src, alt }) => {
      const safeSrc = safeImageUrl(src);
      return safeSrc ? <img className={classes.image} src={safeSrc} alt={alt || ''} loading="lazy" /> : null;
    },
  };

  return (
    <ReactMarkdown
      allowedElements={[
        'p', 'br', 'strong', 'em', 'del', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr', 'table',
        'thead', 'tbody', 'tr', 'th', 'td', 'img',
      ]}
      components={components}
      remarkPlugins={[remarkGfm]}
      skipHtml
      transformLinkUri={(uri) => safeLinkUrl(uri) || ''}
      transformImageUri={(uri) => safeImageUrl(uri) || ''}
      unwrapDisallowed={false}
    >
      {markdown || ''}
    </ReactMarkdown>
  );
};

const styles = (theme) => ({
  paragraph: {
    color: '#000000',
    fontFamily: 'Nunito, sans-serif',
    fontSize: '16px',
    lineHeight: '30px',
    margin: '10px 0 0',
  },
  h2: {
    color: '#345D85',
    fontFamily: 'Inter, sans-serif',
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: '30px',
    margin: '42px 0 0',
    '&:first-child': { marginTop: 0 },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#187C85',
      color: '#FFFFFF',
      fontSize: '22px',
      lineHeight: '30px',
      margin: '28px -10px 16px',
      padding: '14px 10px',
    },
  },
  h3: { color: '#345D85', fontFamily: 'Inter, sans-serif', fontSize: '22px', fontWeight: 400, lineHeight: '30px', margin: '32px 0 0' },
  h4: { color: '#345D85', fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, lineHeight: '28px', margin: '26px 0 0' },
  h5: { color: '#345D85', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '26px', margin: '22px 0 0' },
  h6: { color: '#194A7A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '24px', margin: '20px 0 0', textTransform: 'uppercase' },
  link: { color: '#1C8278', fontFamily: 'Nunito, sans-serif', fontWeight: 500, textDecoration: 'underline' },
  externalIcon: { display: 'inline-block', height: '1em', margin: '0 0 2px 5px', verticalAlign: 'text-bottom', width: '1em' },
  list: { margin: '16px 0', paddingLeft: '28px' },
  listItem: { color: '#000000', fontFamily: 'Nunito, sans-serif', fontSize: '16px', lineHeight: '30px', marginBottom: '4px' },
  blockquote: { borderLeft: '4px solid #B8B8B8', color: '#444444', fontStyle: 'italic', margin: '20px 0', paddingLeft: '16px' },
  image: { display: 'block', height: 'auto', margin: '16px auto', maxWidth: '100%' },
  tableWrapper: { margin: '20px 0', maxWidth: '100%', overflowX: 'auto', '&:focus': { outline: '2px solid #1C8278', outlineOffset: '2px' } },
  table: { borderCollapse: 'collapse', borderTop: '2px solid #345D85', fontFamily: 'Inter, sans-serif', minWidth: '520px', width: '100%' },
  tableHeader: { borderBottom: '2px solid #345D85', color: '#767676', fontSize: '12px', fontWeight: 700, padding: '8px 16px', textAlign: 'left', textTransform: 'uppercase', verticalAlign: 'top' },
  tableCell: { borderBottom: '1px solid #B8B8B8', color: '#000000', fontSize: '14px', lineHeight: '30px', padding: '8px 16px', verticalAlign: 'top' },
});

export default withStyles(styles)(MarkdownContent);
