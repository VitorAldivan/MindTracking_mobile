import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    card: {
      width: '100%',
      borderRadius: 20,
      backgroundColor: '#1E293B',
      padding: 18,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 12,
    },
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
 
  header: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    color:'#ffffff',
  },

   title2: {
    fontSize: 16,
    color:'#ffffff',
  },

  subtitle: {
    color: '#cbd5e1',
    fontSize: 13,
    marginTop: 2,
  },
})