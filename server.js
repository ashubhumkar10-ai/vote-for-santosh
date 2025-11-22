const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3010;
const publicDir = __dirname;
const votesFile = path.join(__dirname, 'votes.json');

// Middleware to parse JSON
app.use(express.json());

// Initialize votes file if it doesn't exist
if (!fs.existsSync(votesFile)) {
  fs.writeFileSync(votesFile, JSON.stringify({ total: 0, candidates: {} }, null, 2));
}

// Helper function to read votes
function readVotes() {
  try {
    const data = fs.readFileSync(votesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { total: 0, candidates: {} };
  }
}

// Helper function to write votes
function writeVotes(votes) {
  fs.writeFileSync(votesFile, JSON.stringify(votes, null, 2));
}

// API endpoint to record a vote
app.post('/api/vote', (req, res) => {
  const { candidateId, candidateName } = req.body;
  
  if (!candidateId) {
    return res.status(400).json({ error: 'Candidate ID is required' });
  }

  const votes = readVotes();
  votes.total = (votes.total || 0) + 1;
  votes.candidates[candidateId] = (votes.candidates[candidateId] || 0) + 1;
  
  // Store candidate name if not already stored
  if (!votes.candidateNames) {
    votes.candidateNames = {};
  }
  if (candidateName) {
    votes.candidateNames[candidateId] = candidateName;
  }

  writeVotes(votes);
  res.json({ success: true, votes: votes });
});

// API endpoint to get vote statistics
app.get('/api/stats', (req, res) => {
  const votes = readVotes();
  res.json(votes);
});

// API endpoint to reset vote counts
app.post('/api/reset', (req, res) => {
  const emptyVotes = { total: 0, candidates: {}, candidateNames: {} };
  writeVotes(emptyVotes);
  res.json({ success: true, message: 'Vote counts reset successfully' });
});

// Serve static files
app.use(express.static(publicDir, {
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (path.extname(filePath) === '.html') {
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

// Catch-all route for SPA
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`VoteForSantosh.com running on http://localhost:${PORT}`);
  console.log(`Admin page: http://localhost:${PORT}/admini.html`);
});

