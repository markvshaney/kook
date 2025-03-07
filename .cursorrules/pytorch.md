# PyTorch Guidelines

Follow these guidelines when working with PyTorch for machine learning components.

## Project Structure

- Place PyTorch code in a dedicated `ml` directory
- Organize by functionality: models, datasets, training, inference
- Use clear file naming conventions

```
ml/
├── models/           # Model definitions
│   ├── __init__.py
│   └── model_name.py
├── datasets/         # Dataset classes and data loading
│   ├── __init__.py
│   └── dataset_name.py
├── training/         # Training scripts and utilities
│   ├── __init__.py
│   ├── train.py
│   └── utils.py
├── inference/        # Inference utilities
│   ├── __init__.py
│   └── predict.py
└── scripts/          # Standalone scripts for training/evaluation
    ├── train_model.py
    └── evaluate_model.py
```

## Model Definitions

- Define models in their own modules
- Use PyTorch's `nn.Module` as a base class
- Implement `__init__` and `forward` methods
- Document model architecture clearly

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MyModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        """
        Initialize model with configuration.
        
        Args:
            input_dim: Input dimension
            hidden_dim: Hidden layer dimension
            output_dim: Output dimension
        """
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        """
        Forward pass through the network.
        
        Args:
            x: Input tensor of shape [batch_size, input_dim]
            
        Returns:
            Tensor of shape [batch_size, output_dim]
        """
        x = F.relu(self.fc1(x))
        return self.fc2(x)
```

## Dataset Handling

- Implement custom datasets using `torch.utils.data.Dataset`
- Use `torch.utils.data.DataLoader` for batch processing
- Handle preprocessing consistently
- Implement data augmentation where appropriate

```python
import torch
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np

class CustomDataset(Dataset):
    def __init__(self, csv_file, transform=None):
        self.data = pd.read_csv(csv_file)
        self.transform = transform
        
    def __len__(self):
        return len(self.data)
        
    def __getitem__(self, idx):
        features = torch.tensor(self.data.iloc[idx, 1:].values, dtype=torch.float32)
        label = torch.tensor(self.data.iloc[idx, 0], dtype=torch.long)
        
        if self.transform:
            features = self.transform(features)
            
        return features, label
```

## Training

- Separate training logic from model definitions
- Use a consistent training loop pattern
- Log metrics with TensorBoard or another logging tool
- Implement early stopping and checkpointing
- Set random seeds for reproducibility

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
import numpy as np
import random

def set_seed(seed):
    """Set seed for reproducibility."""
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    np.random.seed(seed)
    random.seed(seed)
    torch.backends.cudnn.deterministic = True

def train(model, train_loader, val_loader, criterion, optimizer, num_epochs, device, save_path):
    """Train the model and save checkpoints."""
    best_val_loss = float('inf')
    
    for epoch in range(num_epochs):
        # Training phase
        model.train()
        train_loss = 0.0
        
        for inputs, targets in train_loader:
            inputs, targets = inputs.to(device), targets.to(device)
            
            # Zero the parameter gradients
            optimizer.zero_grad()
            
            # Forward + backward + optimize
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item() * inputs.size(0)
            
        train_loss /= len(train_loader.dataset)
        
        # Validation phase
        model.eval()
        val_loss = 0.0
        
        with torch.no_grad():
            for inputs, targets in val_loader:
                inputs, targets = inputs.to(device), targets.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, targets)
                val_loss += loss.item() * inputs.size(0)
                
        val_loss /= len(val_loader.dataset)
        
        print(f'Epoch {epoch+1}/{num_epochs}:')
        print(f'Train Loss: {train_loss:.4f}')
        print(f'Val Loss: {val_loss:.4f}')
        
        # Save checkpoint if validation loss improved
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_loss': val_loss,
            }, save_path)
            print(f'Checkpoint saved to {save_path}')
```

## Model Versioning and Checkpoints

- Use a clear versioning scheme for models
- Save checkpoints during training
- Store metadata with checkpoints (epoch, hyperparameters, etc.)
- Implement validation to verify loaded models

```python
def save_checkpoint(model, optimizer, epoch, val_metrics, filepath):
    """Save model checkpoint with metadata."""
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'val_metrics': val_metrics,
        'timestamp': datetime.now().isoformat(),
        'hyperparams': {
            'learning_rate': optimizer.param_groups[0]['lr'],
            'batch_size': batch_size,
            # Add other hyperparameters
        }
    }
    torch.save(checkpoint, filepath)

def load_checkpoint(filepath, model, optimizer=None):
    """Load model checkpoint and return metadata."""
    checkpoint = torch.load(filepath)
    model.load_state_dict(checkpoint['model_state_dict'])
    
    if optimizer is not None:
        optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        
    return checkpoint
```

## Inference

- Create dedicated inference modules
- Implement proper preprocessing and postprocessing
- Handle batched and single-sample inference
- Consider model quantization for performance

```python
def predict(model, input_data, device, preprocess_fn=None):
    """Run inference on input data."""
    model.eval()
    
    # Apply preprocessing if provided
    if preprocess_fn:
        input_data = preprocess_fn(input_data)
    
    # Ensure data is in the right format
    if not isinstance(input_data, torch.Tensor):
        input_data = torch.tensor(input_data, dtype=torch.float32)
    
    # Add batch dimension if needed
    if input_data.dim() == 1:
        input_data = input_data.unsqueeze(0)
    
    # Move to device
    input_data = input_data.to(device)
    
    # Run inference
    with torch.no_grad():
        output = model(input_data)
    
    return output
```

## Model Serving

- Export models to TorchScript for production
- Implement proper error handling for inference
- Use ONNX format for cross-framework compatibility
- Implement API endpoints for model inference

```python
def export_model_to_torchscript(model, example_input, filepath):
    """Export model to TorchScript format."""
    model.eval()
    with torch.no_grad():
        traced_model = torch.jit.trace(model, example_input)
        torch.jit.save(traced_model, filepath)
    return filepath

def export_model_to_onnx(model, example_input, filepath):
    """Export model to ONNX format."""
    model.eval()
    torch.onnx.export(
        model,
        example_input,
        filepath,
        export_params=True,
        opset_version=12,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={'input': {0: 'batch_size'},
                      'output': {0: 'batch_size'}}
    )
    return filepath
```

## Integration with Web API

- Create server actions for model inference
- Implement proper error handling
- Cache predictions when appropriate
- Handle batch processing efficiently

## Docker Integration

- Use PyTorch-specific Docker images
- Include CUDA dependencies if needed
- Properly manage Python dependencies with requirements.txt or poetry
- Mount volumes for model checkpoints

Example additions to Dockerfile:

```dockerfile
FROM python:3.9-slim

# Install PyTorch dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install PyTorch - CPU version
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Install other requirements
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

EXPOSE 3000

CMD ["python", "app.py"]
```

Example PyTorch-specific docker-compose service:

```yaml
services:
  ml:
    build:
      context: ./ml
      dockerfile: Dockerfile
    volumes:
      - ./ml:/app/ml
      - model_data:/app/models
    ports:
      - "5000:5000"
    environment:
      - MODEL_PATH=/app/models/model.pt
      - WORKERS=2

volumes:
  model_data:
```

## Best Practices

- Use GPU when available, fall back to CPU
- Implement mixed precision training for performance
- Profile and optimize model performance
- Implement proper logging and model monitoring
- Document model architecture and training procedures
- Implement unit tests for critical components