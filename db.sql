PGDMP                      |            db     16.6 (Ubuntu 16.6-1.pgdg22.04+1)     16.6 (Ubuntu 16.6-1.pgdg22.04+1)     Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    26531    db    DATABASE     n   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE db;
                postgres    false            �            1259    26532    c_role    TABLE     ^  CREATE TABLE public.c_role (
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
       public         heap    postgres    false            �            1259    26537    c_user    TABLE     �  CREATE TABLE public.c_user (
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
    is_deleted boolean DEFAULT false,
    id_customer character varying(36)
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    26545 
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
       public         heap    postgres    false            �            1259    26552 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
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
       public         heap    postgres    false            �            1259    26557    menu    TABLE     �  CREATE TABLE public.menu (
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
       public         heap    postgres    false            �            1259    26565 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
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
       public         heap    postgres    false            Q          0    26532    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   �       R          0    26537    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   \        S          0    26545 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   "       T          0    26552 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �$       U          0    26557    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   3%       V          0    26565 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   �'       �           2606    26573    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            �           2606    26575    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            �           2606    26577    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            �           2606    26579    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            �           2606    26581    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            �           2606    26583    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            �           2606    26584    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    216    3254            Q   �   x�M�1� �N��y��Lk��F��"�?B�ġ�7��)	���8'g�Fบ��c`Q����>=g�!a�o��&�eg=�>_�v5��P���Ș���tpF�	��_u���k�+b4�Q����r�����6*{      R   �  x����nQ���S�`{����B	)�2����9W4L \�ry�N�TB�U��_�d�MQ��H���	�a����Ҍ��ώ�]<ذ����G]�w����ޯ��|ϗ�^}yL�u�y=8�˯���q�y�/���p���Sf-8��j�J$�A �(G*!��&�@9A Tw)-@`r�h���>3���88�PӒ.�$�2$1��܂� 2l�z{mNӅ�Lfׯ�O|\�\�VQ:��v��<NS�<l�M�q�ԔP�EZ0U�kF�?�S6�U���X�^_i��1�@vu��TW{����å����u:���z'aX.U��W�������n�N��P���k&S�F�D�GG8���b!P�$7I�{���(P�L�d�Nߕ3ǜ��>�)#N�dej�$VM4����U��N�6��      S   �  x�mS�n�0=�_�0	.C���)Z�#	�K/#.��X2d	A��#'�۴� I���[f�`�N��]� Iq��s/s��I�T]I]m����|b�<�w�z>a?ሕ4ʃ����`7�ٗ��g�zX3���mq?q�ؚ}�)���[2
�m�駎~�%��1����}�'dw�a�S�Q=���3�M��C�At�"�uN(¹ $n+-5p��6L���FiQKWK�~\�Uu�t�0�yK��b,
	�K+i�-yU@�h C�d�&v���͋%�Nu3���yb��4�&�o{O��#�dUu���1n���K���m�5�7�7�t��ㅵ��v�N���q2�Cq����!e�9{��� ��w��l;O�nb�&"�ڒ�s�%(v�%��>��C��n�4��0T��xL��ߴԂ��S��E���}��PJk��2�XRn�?G������\D�]���% ��Xl��2���.�~w�L�T�jA��.�iZ���LEsu��aM_��hA&�tV�3�p�1�*ul;v���Wt��Z�+�/Qwx$76�k�K�Ƙ_@,��|w�K�1IL�F����k ۞���)i�,-�֙Sd��,��S���$ʝ���n�����g�=�I���Ϋ�n�z�/�U��n�?_�D�/52ވ ����y�����/I      T   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      U   X  x�m��n�0@��W�q�CI�(�6l��Æ�z�,)��Elo���n�8k ÐI|~���1I�"[c���w��\���Tw~ө�Tݥ�T���~��^D?���T�J�B!Ah��l�i�j�fG�Ï��mS$�,R����@8]^��*C��o~x�?�j��U�K~��{���K݅Bq-�En�m�����RBQ]�@� i���^	�%����E�uV�I�����W��qw��=8Cu�N����?��b[�*p��%Q2��P�}�"�(ː:]���2�hPs���1��2��~>/`�6V���q� �%�
[cY�T�+��I��KB��8�[Rƣ�Fk�)�T�|�PI-���l��%w~�N�����J�R0#����GKKo)�����ĩEl4:>cE�:���%�$���P���2&���4��aF{SսVh��؝���)��ժ5�S�����)�X���d���Qt���d�0I���-����a� �<i���ס�O��!5�~��˝���@l.�Lpo���S�L�3v)��g����N%0�7�50C���Z���m��adk�2���E$YV�P���l6� ��8�      V   �  x���Kj�@E�~��d$�����^A&���Z~44$v����f�;���A��$�� ����qX�H�
.ˁ����y��y�,@�Hѥ~"FU?>��{.B�m� }�Q����i���h{_�*�At�@���p˚�~��Y��u�		�;�b�c�G�5k��l����%���o�)��������q��lj7{^��a��u���^Lb�~F�L�г&�Q"�UR ����.��X����0v�I��y�ՔYL��������b������7V��"�QGɔ-��fu��A�w�V���h�[MWǰ4L�Ѐ����f��	���v���+����I�M����NrZ0��6;7j�s�Of�-���*�sy�q�?翰�%��@�?lD�Z�,��O��m���L�V��m?��&+���B;sU����z��f�
     