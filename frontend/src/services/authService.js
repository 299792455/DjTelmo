import { jwtDecode } from 'jwt-decode';


export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {  // Assure-toi d'utiliser le bon port
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const contentType = response.headers.get('Content-Type');
    
    if (!response.ok) {
      let errorMessage;
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.error || 'Erreur lors de la connexion';
      } else {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      // Stocke le token
      localStorage.setItem('token', data.token);
      // Décode le token pour récupérer le rôle
      const decoded = jwtDecode(data.token);
      localStorage.setItem('userRole', decoded.role);  // par exemple, "Admin"
      return data;
    } else {
      throw new Error('La réponse du serveur n’est pas du JSON.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
