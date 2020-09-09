import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';
const regExp = /<a.*?href="(?<url>(?:[\w]*:\/\/)?(?:[\w-_]+\.)+\w+.*?)".*?>(?<caption>[^<].*?)<\/.*?/g

class HyperlinksParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetching: false,
      arrayValue: []
    };
  }

  parseHTML = htmlText => {
    const allMatch = htmlText?.matchAll(regExp);
    const arrayValue = [];
    for (const item of allMatch) {
      arrayValue.push([item.groups.url, item.groups.caption]);
    }
    return arrayValue;
  }

  loadHtmlText = url => {
    return fetch(url, {
      method: 'GET',
      'Content-type': 'text/html',
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          arrayValue: this.parseHTML(data),
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      });
  };

  handleSubmit = ({ values: { url } }) => {
    this.loadHtmlText(url);
  };

  render() {
    let { arrayValue } = this.state;
    return (
      <article>
        <Form onSubmit={this.handleSubmit} />
        <section>
          <Table arrayValue={arrayValue} />
        </section>
      </article>
    );
  }
}

export default HyperlinksParser;
