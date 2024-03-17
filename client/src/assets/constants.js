import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup, HiLogin, HiUser, HiUserAdd, HiLogout } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome ,authCheck: false},
  { name: 'Play Lists', to: '/play-lists', icon: HiOutlinePhotograph ,authCheck: false},
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup ,authCheck: false},
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag ,authCheck: false},
  { name: "Login", to: "/login", icon: HiLogin ,authCheck: true},
  { name: "Registartion", to: "/registration", icon: HiUserAdd ,authCheck: true}
];
