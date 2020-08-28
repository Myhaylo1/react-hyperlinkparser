import React, { Component } from 'react';
import styles from './Table.module.scss';

class Table extends Component {
  render() {
    let { htmlText } = this.props;
    let regExp = /<a.*?href="((?:[\w]*:\/\/)?(?:[\w-_]+\.)+\w+.*?)".*?>([^<].*?)<\/.*?/g;
    let s;
    let arrayValue = [];
    do {
      s = regExp.exec(htmlText);
      if (s) arrayValue.push([s[1], s[2]]);
    } while (regExp.lastIndex);
    const table = arrayValue.map(function (item) {
      return (
        <tr key={item} >
          <td className={styles.tableCell}><a href={item[0]}>{item[0]}</a></td>
          <td className={styles.tableCell}>{item[1]}</td>
        </tr >
      )
    })
    return (
      <table>
        <colgroup>
          <col className={styles.tableCol} />
          <col className={styles.tableCol} />
        </colgroup>
        <tbody>
          <tr>
            <th className={styles.tableCell}>Hyperlink value</th>
            <th className={styles.tableCell}>Link label</th>
          </tr>
          {table}
        </tbody>
      </table >
    );
  }
}

export default Table;