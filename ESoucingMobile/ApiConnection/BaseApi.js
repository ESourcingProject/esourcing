
const GetAsync = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const jsonRes = await response.json();
        return jsonRes;
    }
    catch (error) {
        console.error(error);
    }
}


const PostAsync = async (url,model) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });

        const jsonRes = await response.json();
        return jsonRes;
    }
    catch (error) {
        console.error(error);
    }
}

const PutAsync = async (url,model) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });

        const jsonRes = await response.json();
        return jsonRes;
    }
    catch (error) {
        console.error(error);
    }
}

const DeleteAsync = async (url,id) => {
    try {
        const response = await fetch(url + "/" + id, {
            method: 'DELETE'
        });

        const jsonRes = await response.json();
        return jsonRes;
    }
    catch (error) {
        console.error(error);
    }
}

export {GetAsync,PostAsync,PutAsync,DeleteAsync};