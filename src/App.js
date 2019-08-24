import React, { Component} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Customer from './components/Customer'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3, // 여백을 3의 가중치만큼 주겠다.
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id': '1',
    'image': 'https://placeimg.com/64/64/any',
    'name': '홍길동',
    'birthday': '999999',
    'gender': '여자',
    'job': '대학원생'
  },
  {
    'id': '2',
    'image': 'https://placeimg.com/64/64/1',
    'name': '김철수',
    'birthday': '12345',
    'gender': '남자',
    'job': '대학원'
  },
  {
    'id': '3',
    'image': 'https://placeimg.com/64/64/2',
    'name': '김영희',
    'birthday': '123456',
    'gender': '여자',
    'job': '대학원생'
  },
]

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
          {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                />
            );
          })
        }
        </TableBody>
      </Table>
      </Paper>
   );
  }
}

export default withStyles(styles)(App);