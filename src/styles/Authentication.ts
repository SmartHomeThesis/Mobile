import {StyleSheet} from 'react-native';
import {blue, gray} from '../styles/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 30,
    color: 'white',
    fontWeight: '500',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    color: gray.primary,
    textAlign: 'center',
    paddingBottom: 60,
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 24,
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
});
