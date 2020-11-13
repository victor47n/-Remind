import { GRAPHQL_API_URL } from 'react-native-dotenv';

const updatePushToken = async (user, token) => {
    const data = {
        user,
        token,
    };

    try {
        const response = await api.post('notification/token', data);
        if (response.status >= 200 && response.status < 300) {
            Clear();
            navigateBack();
        }
    } catch (error) {
        alert(error);
    }

    const query = JSON.stringify({
        query: `
      mutation {
        update_users_by_pk(pk_columns: {id: "${user.uid}"}, _set: {expoPushToken: "${token}"}) {
          expoPushToken
        }
      }
    `,
    });

    try {
        const response = await fetch(GRAPHQL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await user.getIdToken()}`,
            },
            body: query,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('err', error);
    }
};