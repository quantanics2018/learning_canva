PGDMP                          |            quantanics_learning %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    29731    quantanics_learning    DATABASE     y   CREATE DATABASE quantanics_learning WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
 #   DROP DATABASE quantanics_learning;
                postgres    false            �            1259    29732    user_id_increment    SEQUENCE     }   CREATE SEQUENCE public.user_id_increment
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_id_increment;
       public          postgres    false            �            1259    29740    users_tb    TABLE     Y  CREATE TABLE public.users_tb (
    user_id text DEFAULT ('MU'::text || nextval('public.user_id_increment'::regclass)) NOT NULL,
    user_email character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users_tb;
       public         heap    postgres    false    202            �          0    29740    users_tb 
   TABLE DATA           \   COPY public.users_tb (user_id, user_email, username, password, last_updated_on) FROM stdin;
    public          postgres    false    203   �	       �           0    0    user_id_increment    SEQUENCE SET     B   SELECT pg_catalog.setval('public.user_id_increment', 1007, true);
          public          postgres    false    202            x           2606    29748    users_tb users_tb_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users_tb
    ADD CONSTRAINT users_tb_pkey PRIMARY KEY (user_id);
 @   ALTER TABLE ONLY public.users_tb DROP CONSTRAINT users_tb_pkey;
       public            postgres    false    203            �   �   x���M� ��5���0�����Ѧij1i�������t�y�~T	 ,��6n�>�q��l��0�̓�N*�(,�
I�+#�ȫ@ý�cw��`�D��؏d�D���@�*K�~��<YF��$d��)m.���S�/k��v�vK���ĺe��R���WD:\ղ����J��w9����(8�O�f�     