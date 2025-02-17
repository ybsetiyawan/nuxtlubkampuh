PGDMP     	                
    |            ahmad    10.23 #   14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)     G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    265433    ahmad    DATABASE     Z   CREATE DATABASE ahmad WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE ahmad;
                postgres    false            �            1259    265441    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public            postgres    false            �            1259    265525    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_user;
       public            postgres    false            �            1259    266845 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public            postgres    false            �            1259    265434 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public            postgres    false            �            1259    265541    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public            postgres    false            �            1259    265550 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public            postgres    false            @          0    265441    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    197   d       A          0    265525    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    198           D          0    266845 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    201   �        ?          0    265434 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    196   V!       B          0    265541    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    199   �!       C          0    265550 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    200   h#       �
           2606    265447    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    197            �
           2606    265535    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    198            �
           2606    266854    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    201            �
           2606    265440    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    196            �
           2606    265549    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    199            �
           2606    265558    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    200            �
           2606    265536    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    197    2748    198            @   �   x�M�1� �N��y��Lk��F��"�?B�ġ�7��)	���8'g�Fบ��c`Q����>=g�!a�o��&�eg=�>_�v5��P���Ș���tpF�	��_u���k�+b4�Q����r�����6*{      A   �   x�Mͻ��0@���
��f�^gL	B<V)�ƉmY"���KA�t��]&!�� ^#��6R�*E��$�꧿�·���ɜ��0���r}oO+W\p�[�a2M��6v��<���{x��[yt��g�{l�H\���k	\�H�!��L�� !��GX��N4�U�����,��9I7!      D   |   x�%�A� E�p
.0�W�z7�h*61���i������r!�p�,ɑ��H��u�&E���S�j>�s3u�*����&�n��wȓ�Dp�`��'GvL>p�J�-z�Z��#      ?   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      B   �  x�m�Ao�0��ί0�� [�(R�mخ�e�٢Ҡ�3�v��'g��b�x"�Gʒ$��
���r%-L�)e]}��s��T�i+d\��q^^���9���I~�{TFT��	5�Cg��`,`��}=� N,�!�!/��<zR�:K.��j�x��r�c{^���//�L��m���6�w��٨��$�IerNa�QŁ�B����>��!N�\�O{�?mM���8��@�9Ӑ�7`�BCa[0T'�2E����!�|��o�.GuY柧�*u4��}��h�Z%̠0"���K�\J��e�/璪=�ҵÛ���5m`P��Zw�t��L�ظ����
%[|�2�8]"���qZ���.�{��PO鵜4}�Yc ^W��r5��Q��!���5�5���?S_͟      C   �  x���K��@��sZ@>DN0�u�#�eM�)�eyaW}?�s�����{����5�u�r\�����mdvo�X����Z/�s1� !4�@�9n�'2�����ug��bY1#����ᑽ���T���b����q���r=kSG g�*���9�~'c�o�O	��CY�Z��@�ƄD3X{�&#�·5�BE+��A�7v���t���э�l�]�g�i'{usN�FɩFф晓�g\��YS��5�}�G�Z���Q�2}'��i�՗�"ߴ�G)�S���7J:C��u7�`���Ĩ�v����iX?_v������l���fs8g��+|�\�`5�9�O�cG�۽HJ�*�!O�;7���׹  �D��1����V�ߴ>��o��c     