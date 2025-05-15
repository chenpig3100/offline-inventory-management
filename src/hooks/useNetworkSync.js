import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { syncProducts } from '../services/sync';

export default function useNetworkSync() {
    useEffect(() => {
        const status = NetInfo.addEventListener(state => {
            if(state.isConnected) { 
                console.log('Online');
                syncProducts();
            } else {
                console.log('Offline');
            }
        });
        return () => status();
    }, []);
}