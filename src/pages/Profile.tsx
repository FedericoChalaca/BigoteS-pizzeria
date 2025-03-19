import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (err) {
      setError('Error al cerrar sesión');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nombre</label>
            <p className="text-gray-900">{profile?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
            <p className="text-gray-900">{profile?.email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Teléfono</label>
            <p className="text-gray-900">{profile?.phone}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Dirección</label>
            <p className="text-gray-900">{profile?.address || 'No especificada'}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;