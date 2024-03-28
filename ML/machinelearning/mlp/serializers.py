from rest_framework import serializers
from .models import Clothing, ClothingDetail, ClothingTexture, ClothingStyle, UserClothing, Style, Texture

class ClothingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingDetail
        fields = ['clothing_detail_id', 'clothing_img_path', 'color']

class TextureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texture
        fields = ['texture_id', 'texture_name']

class ClothingTextureSerializer(serializers.ModelSerializer):
    texture = TextureSerializer(read_only=True)

    class Meta:
        model = ClothingTexture
        fields = ['texture_connection_id', 'texture']

class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ['style_id', 'style_name']

class ClothingStyleSerializer(serializers.ModelSerializer):
    style = StyleSerializer(read_only=True)

    class Meta:
        model = ClothingStyle
        fields = ['style_connection_id', 'style']

class UserClothingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClothing
        fields = ['clothing_connection_id', 'clothing_name', 'accrue_worn_count']

class ClothingSerializer(serializers.ModelSerializer):
    clothing_detail = ClothingDetailSerializer(read_only=True)
    clothing_textures = ClothingTextureSerializer(source='clothingtexture_set', many=True, read_only=True)
    clothing_styles = ClothingStyleSerializer(source='clothingstyle_set', many=True, read_only=True)
    user_clothings = UserClothingSerializer(source='userclothing_set', many=True, read_only=True)

    class Meta:
        model = Clothing
        fields = ['clothing_id', 'clothing_detail', 'now_at', 'rfid_uid', 'created_at', 'update_at', 'washed_at', 'polluted', 'worn_count', 'category', 'clothing_textures', 'clothing_styles', 'user_clothings']
