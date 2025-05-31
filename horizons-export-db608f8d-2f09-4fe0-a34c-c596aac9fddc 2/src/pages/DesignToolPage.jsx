import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type, Image as ImageIcon, Palette, Move, ZoomIn, RotateCcw, Eye, Check, Save, Trash2, Layers } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDesign } from '@/contexts/DesignContext';

const productDetails = {
  tshirt: { name: 'T-Shirt', image: '/product-placeholders/tshirt-mockup.png', designArea: { x: 150, y: 100, width: 200, height: 300 } },
  mug: { name: 'Mug', image: '/product-placeholders/mug-mockup.png', designArea: { x: 100, y: 150, width: 300, height: 200 } },
  hat: { name: 'Hat', image: '/product-placeholders/hat-mockup.png', designArea: { x: 180, y: 80, width: 150, height: 100 } },
  bag: { name: 'Tote Bag', image: '/product-placeholders/bag-mockup.png', designArea: { x: 120, y: 100, width: 260, height: 250 } },
};

const DesignToolPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentDesign, updateDesignElement, addDesignElement, removeDesignElement, loadDesign, saveCurrentDesign, clearDesign } = useDesign();
  
  const [product, setProduct] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Tool states
  const [textValue, setTextValue] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productId && productDetails[productId]) {
      setProduct(productDetails[productId]);
      loadDesign(productId); // Load design for this product
    } else {
      toast({ title: "Invalid Product", description: "This product doesn't exist.", variant: "destructive" });
      navigate('/products');
    }
    return () => saveCurrentDesign(productId); // Save design when navigating away
  }, [productId, navigate, toast, loadDesign, saveCurrentDesign]);

  const selectedElement = currentDesign.elements.find(el => el.id === selectedElementId);

  useEffect(() => {
    if (selectedElement) {
      if (selectedElement.type === 'text') {
        setTextValue(selectedElement.content);
        setTextColor(selectedElement.color);
        setFontSize(selectedElement.fontSize);
      } else if (selectedElement.type === 'image') {
        setImageUrl(selectedElement.src);
      }
    } else {
      setTextValue('');
      setTextColor('#000000');
      setFontSize(24);
      setImageUrl('');
    }
  }, [selectedElementId, currentDesign.elements]);


  const handleAddText = () => {
    if (!textValue.trim()) {
      toast({ title: "Text Required", description: "Please enter some text.", variant: "destructive" });
      return;
    }
    const newElement = { type: 'text', content: textValue, x: 50, y: 50, color: textColor, fontSize, id: Date.now().toString() };
    addDesignElement(newElement);
    setSelectedElementId(newElement.id);
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) {
      toast({ title: "Image URL Required", description: "Please enter an image URL.", variant: "destructive" });
      return;
    }
    const newElement = { type: 'image', src: imageUrl, x: 50, y: 100, width: 100, height: 100, id: Date.now().toString() };
    addDesignElement(newElement);
    setSelectedElementId(newElement.id);
  };
  
  const handleUpdateElement = (props) => {
    if (selectedElementId) {
      updateDesignElement(selectedElementId, props);
    }
  };

  const handleRemoveElement = () => {
    if (selectedElementId) {
      removeDesignElement(selectedElementId);
      setSelectedElementId(null);
    }
  };

  const handleFinalizeDesign = () => {
    saveCurrentDesign(productId);
    toast({ title: "Design Saved!", description: "Your masterpiece is ready for the next step." });
    navigate('/order-confirmation');
  };
  
  if (!product) return <div className="text-center py-10">Loading product details...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-8 text-center gradient-text"
      >
        Customize Your {product.name}
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Design Tools Panel */}
        <Card className="md:col-span-1 glassmorphic-card h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center"><Palette className="mr-2 text-primary"/>Design Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="text"><Type className="mr-1 inline-block h-4 w-4"/>Text</TabsTrigger>
                <TabsTrigger value="image"><ImageIcon className="mr-1 inline-block h-4 w-4"/>Image</TabsTrigger>
                <TabsTrigger value="layers"><Layers className="mr-1 inline-block h-4 w-4"/>Layers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="text-input">Text Content</Label>
                  <Textarea id="text-input" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Your Text Here" className="bg-input/50"/>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="text-color">Color:</Label>
                  <Input id="text-color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-16 h-8 p-1 bg-input/50"/>
                </div>
                <div>
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  <Slider id="font-size" defaultValue={[fontSize]} max={72} min={8} step={1} onValueChange={(val) => setFontSize(val[0])} />
                </div>
                <Button onClick={handleAddText} className="w-full">Add Text</Button>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input id="image-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.png" className="bg-input/50"/>
                </div>
                <Button onClick={handleAddImage} className="w-full">Add Image</Button>
                <p className="text-xs text-muted-foreground">Note: Use Unsplash or similar for image URLs. Direct uploads require backend.</p>
              </TabsContent>

              <TabsContent value="layers" className="space-y-2 max-h-60 overflow-y-auto">
                <Label>Design Elements</Label>
                {currentDesign.elements.length === 0 && <p className="text-sm text-muted-foreground">No elements added yet.</p>}
                {currentDesign.elements.map(el => (
                  <div 
                    key={el.id} 
                    onClick={() => setSelectedElementId(el.id)}
                    className={`p-2 border rounded-md cursor-pointer transition-colors ${selectedElementId === el.id ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'}`}
                  >
                    <span className="text-sm capitalize">{el.type}: {el.type === 'text' ? el.content.substring(0,15)+'...' : el.src.substring(el.src.lastIndexOf('/')+1).substring(0,15)+'...'}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            {selectedElementId && (
              <div className="mt-6 border-t border-border pt-4 space-y-4">
                <h4 className="text-lg font-semibold gradient-text">Edit Selected Element</h4>
                {selectedElement?.type === 'text' && (
                  <>
                    <Textarea value={selectedElement.content} onChange={(e) => handleUpdateElement({ content: e.target.value })} placeholder="Your Text Here" className="bg-input/50"/>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="sel-text-color">Color:</Label>
                      <Input id="sel-text-color" type="color" value={selectedElement.color} onChange={(e) => handleUpdateElement({ color: e.target.value })} className="w-16 h-8 p-1 bg-input/50"/>
                    </div>
                    <div>
                      <Label htmlFor="sel-font-size">Font Size: {selectedElement.fontSize}px</Label>
                      <Slider id="sel-font-size" defaultValue={[selectedElement.fontSize]} max={72} min={8} step={1} onValueChange={(val) => handleUpdateElement({ fontSize: val[0] })} />
                    </div>
                  </>
                )}
                 {selectedElement?.type === 'image' && (
                  <>
                    <Input value={selectedElement.src} onChange={(e) => handleUpdateElement({ src: e.target.value })} placeholder="Image URL" className="bg-input/50"/>
                     <div>
                      <Label htmlFor="sel-img-width">Width: {selectedElement.width}px</Label>
                      <Slider id="sel-img-width" defaultValue={[selectedElement.width]} max={product.designArea.width} min={20} step={1} onValueChange={(val) => handleUpdateElement({ width: val[0] })} />
                    </div>
                     <div>
                      <Label htmlFor="sel-img-height">Height: {selectedElement.height}px</Label>
                      <Slider id="sel-img-height" defaultValue={[selectedElement.height]} max={product.designArea.height} min={20} step={1} onValueChange={(val) => handleUpdateElement({ height: val[0] })} />
                    </div>
                  </>
                )}
                <Button onClick={handleRemoveElement} variant="destructive" className="w-full"><Trash2 className="mr-2 h-4 w-4"/>Remove Element</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <div className="md:col-span-2">
          <Card className="glassmorphic-card sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center"><Eye className="mr-2 text-secondary"/>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative w-full aspect-[3/4] bg-muted/30 rounded-md overflow-hidden border border-dashed border-border"
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              >
                {/* This is a simplified preview. Drag and drop, resize handles would need more complex logic */}
                <div 
                    className="absolute border border-dashed border-primary/50 pointer-events-none" 
                    style={{ 
                        left: `${product.designArea.x}px`, 
                        top: `${product.designArea.y}px`, 
                        width: `${product.designArea.width}px`, 
                        height: `${product.designArea.height}px` 
                    }}
                >
                    <span className="absolute -top-5 left-0 text-xs text-primary/70">Design Area</span>
                </div>

                {currentDesign.elements.map(el => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElementId(el.id)}
                    className={`absolute cursor-grab ${selectedElementId === el.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                    style={{
                      left: `${product.designArea.x + el.x}px`,
                      top: `${product.designArea.y + el.y}px`,
                      color: el.type === 'text' ? el.color : undefined,
                      fontSize: el.type === 'text' ? `${el.fontSize}px` : undefined,
                      width: el.type === 'image' ? `${el.width}px` : undefined,
                      height: el.type === 'image' ? `${el.height}px` : undefined,
                      userSelect: 'none'
                    }}
                  >
                    {el.type === 'text' ? (
                      <span>{el.content}</span>
                    ) : (
                      <img-replace src={el.src} alt="User design element" class="w-full h-full object-contain pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Product image is a mockup. Actual design placement may vary slightly.</p>
            </CardContent>
          </Card>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.5}}
          >
            <Button onClick={() => clearDesign(productId)} variant="outline" className="w-full sm:w-auto border-destructive text-destructive hover:bg-destructive/10">
              <RotateCcw className="mr-2 h-4 w-4"/> Reset Design
            </Button>
            <Button onClick={() => saveCurrentDesign(productId)} variant="secondary" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4"/> Save Progress
            </Button>
            <Button onClick={handleFinalizeDesign} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
              Finalize & Proceed <Check className="ml-2 h-5 w-5"/>
            </Button>
          </motion.div>
        </div>
      </div>
       <div id="image-preload" style={{ display: 'none' }}>
        <img-replace src="/product-placeholders/tshirt-mockup.png" alt="Preload T-Shirt"/>
        <img-replace src="/product-placeholders/mug-mockup.png" alt="Preload Mug"/>
        <img-replace src="/product-placeholders/hat-mockup.png" alt="Preload Hat"/>
        <img-replace src="/product-placeholders/bag-mockup.png" alt="Preload Bag"/>
      </div>
    </motion.div>
  );
};

export default DesignToolPage;