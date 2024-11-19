import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      p: '0 5px',
      m: '0 5px',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
      ${theme.trello.boardContentHeight} - 
      ${theme.spacing(4)} - 
      ${theme.trello.columnHeaderHeight} -
      ${theme.trello.columnFooterHeight})`,
      '*::-webkit-scrollbar':{
        width: '8px',
        height: '8px'
      },
      '*::-webkit-scrollbar-thumb':{
        backgroundColor: '#bdc3c7',
        borderRadius: '8px'
      },
      '*::-webkit-scrollbar-thumb:hover':{
        backgroundColor: '#55efc4'
      }
    }}>
      {cards.map(card => <Card key={card._id} card = {card} /> )}
    </Box>
  )
}

export default ListCards
