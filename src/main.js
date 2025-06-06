import './style.css';

const API_URL = 'https://ukbinwwzanoliyqeroyo.supabase.co/rest/v1/article?select=*'; 
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrYmlud3d6YW5vbGl5cWVyb3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjcwNDUsImV4cCI6MjA2MzI0MzA0NX0.4OXhMdfidCS9hzCc_nUq6ypumTYwbxJ0lH48HCC29v8'; 

const fetchArticles = async () => {
  try {
    const response = await fetch(`${API_URL}?select=*`, {
      headers: {
        apikey: API_KEY,
      },
    });
    const data = await response.json();
    console.log('Artykuły:', data);
    displayArticles(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const displayArticles = (articles) => {
  const container = document.getElementById('articles');
  container.innerHTML = '';

  articles.forEach((article) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${article.title} - ${article.subtitle}</h4>
      <p><strong>Autor: ${article.author}</strong></p>
      <p>Utworzono: ${article.created_at}</p>
      <p>${article.content}</p>
      <hr>
    `;
    container.appendChild(div);
  });
};

const createNewArticle = async (title, subtitle, author, content) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apikey: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, subtitle, author, content }),
    });

    if (response.status !== 201) {
      throw new Error(`Status: ${response.status}`);
    }

    console.log('Dodano artykuł.');
    fetchArticles(); 
  } catch (error) {
    console.error('Error:', error);
  }
};


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('articleForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    createNewArticle(title, subtitle, author, content);

    form.reset();
  });

  fetchArticles(); 
});

window.onload = fetchArticles;